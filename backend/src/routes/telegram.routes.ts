import { Router, Request, Response } from 'express';
import prisma from '../config/database.js';
import {
  sendTelegramMessageDirect,
  sendTelegramMessageWithButtons,
  editTelegramMessage,
  answerCallbackQuery,
} from '../services/telegram.service.js';

const router = Router();

// ─── Telegram Webhook Handler ───────────────────────────────────────────────
// This endpoint receives updates from Telegram. No auth middleware —
// it's called by Telegram's servers. The route is secured by keeping the
// webhook URL secret (registered via setWebhook with the bot token).

router.post('/webhook', async (req: Request, res: Response) => {
  try {
    const update = req.body;

    // Handle regular messages (commands)
    if (update.message?.text) {
      await handleMessage(update.message);
    }

    // Handle callback queries (inline keyboard button presses)
    if (update.callback_query) {
      await handleCallbackQuery(update.callback_query);
    }

    // Always respond 200 to Telegram (otherwise it retries)
    res.sendStatus(200);
  } catch (err) {
    console.error('[Telegram Webhook] Error:', err);
    res.sendStatus(200); // Still 200 — don't make Telegram retry
  }
});

// ─── /start <user_id> — Link Telegram account ──────────────────────────────
async function handleMessage(message: any) {
  const chatId = message.chat.id;
  const text = (message.text || '').trim();

  // /start command with deep link payload
  if (text.startsWith('/start')) {
    const payload = text.split(' ')[1]; // The user UUID
    if (payload) {
      await handleStartCommand(chatId, payload);
    } else {
      await sendTelegramMessageDirect(
        chatId,
        '👋 <b>Welcome to StudentOS Bot!</b>\n\n' +
          'To connect your account, use the link from your StudentOS Dashboard.\n\n' +
          '💡 <b>Commands:</b>\n' +
          "/habits — View & toggle today's habits"
      );
    }
    return;
  }

  // /habits command
  if (text === '/habits') {
    await handleHabitsCommand(chatId);
    return;
  }

  // Unknown command
  await sendTelegramMessageDirect(
    chatId,
    "🤖 I don't understand that command.\n\n" +
      '💡 <b>Available commands:</b>\n' +
      "/habits — View & toggle today's habits"
  );
}

// ─── Deep Link: Connect Telegram to StudentOS account ───────────────────────
async function handleStartCommand(chatId: number, userUuid: string) {
  try {
    // Find the user by ID
    const user = await prisma.user.findUnique({
      where: { id: userUuid },
      select: { id: true, email: true, studentProfile: { select: { fullName: true } } },
    });

    if (!user) {
      await sendTelegramMessageDirect(
        chatId,
        '❌ Invalid link. Please use the Connect button from your StudentOS Dashboard.'
      );
      return;
    }

    // Check if this Telegram account is already linked to another user
    const existing = await prisma.user.findFirst({
      where: { telegramChatId: BigInt(chatId), id: { not: userUuid } },
    });

    if (existing) {
      await sendTelegramMessageDirect(
        chatId,
        '⚠️ This Telegram account is already connected to a different StudentOS account.'
      );
      return;
    }

    // Link the Telegram chat ID to the user
    await prisma.user.update({
      where: { id: userUuid },
      data: { telegramChatId: BigInt(chatId) },
    });

    const name = user.studentProfile?.fullName || user.email;

    await sendTelegramMessageDirect(
      chatId,
      `✅ <b>Successfully connected to StudentOS!</b>\n\n` +
        `Hello, <b>${name}</b>! You will now receive notifications here.\n\n` +
        `💡 <b>Commands:</b>\n` +
        `/habits — View & toggle today's habits`
    );
  } catch (err) {
    console.error('[Telegram] handleStartCommand error:', err);
    await sendTelegramMessageDirect(chatId, '❌ Something went wrong. Please try again.');
  }
}

// ─── /habits — Interactive habit tracker ────────────────────────────────────
async function handleHabitsCommand(chatId: number) {
  try {
    // Find user by telegramChatId
    const user = await prisma.user.findFirst({
      where: { telegramChatId: BigInt(chatId) },
      select: { id: true },
    });

    if (!user) {
      await sendTelegramMessageDirect(
        chatId,
        '❌ Your Telegram is not linked to a StudentOS account.\n\n' +
          'Use the <b>Connect Telegram</b> button in your StudentOS Dashboard.'
      );
      return;
    }

    // Get today's habits with completion status
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const habits = await prisma.habit.findMany({
      where: { userId: user.id, isActive: true },
      include: {
        logs: {
          where: { completedAt: { gte: today } },
          take: 1,
        },
      },
      orderBy: { createdAt: 'asc' },
    });

    if (habits.length === 0) {
      await sendTelegramMessageDirect(
        chatId,
        "📋 You don't have any habits yet.\n\nCreate habits in your StudentOS Dashboard!"
      );
      return;
    }

    // Build inline keyboard
    const buttons = habits.map((habit) => {
      const completed = habit.logs.length > 0;
      const icon = completed ? '✅' : '⬜';
      return [
        {
          text: `${icon} ${habit.title}`,
          callback_data: `habit_toggle:${habit.id}`,
        },
      ];
    });

    const completedCount = habits.filter((h) => h.logs.length > 0).length;

    await sendTelegramMessageWithButtons(
      chatId,
      `📋 <b>Today's Habits</b> (${completedCount}/${habits.length})\n\n` +
        `Tap a habit to toggle it:`,
      buttons
    );
  } catch (err) {
    console.error('[Telegram] handleHabitsCommand error:', err);
    await sendTelegramMessageDirect(chatId, '❌ Failed to load habits. Please try again.');
  }
}

// ─── Callback Query Handler (Inline Keyboard Presses) ──────────────────────
async function handleCallbackQuery(callbackQuery: any) {
  const chatId = callbackQuery.message.chat.id;
  const messageId = callbackQuery.message.message_id;
  const data = callbackQuery.data || '';

  // Answer the callback immediately (removes loading spinner)
  await answerCallbackQuery(callbackQuery.id);

  // Handle habit toggle
  if (data.startsWith('habit_toggle:')) {
    const habitId = data.replace('habit_toggle:', '');
    await toggleHabit(chatId, messageId, habitId);
  }
}

// ─── Toggle Habit Completion ────────────────────────────────────────────────
async function toggleHabit(chatId: number, messageId: number, habitId: string) {
  try {
    const user = await prisma.user.findFirst({
      where: { telegramChatId: BigInt(chatId) },
      select: { id: true },
    });

    if (!user) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if already completed today
    const existingLog = await prisma.habitLog.findFirst({
      where: {
        habitId,
        userId: user.id,
        completedAt: { gte: today },
      },
    });

    if (existingLog) {
      // Un-complete: remove the log
      await prisma.habitLog.delete({ where: { id: existingLog.id } });
    } else {
      // Complete: create a log
      await prisma.habitLog.create({
        data: { habitId, userId: user.id },
      });
    }

    // Re-fetch all habits to rebuild the keyboard
    const habits = await prisma.habit.findMany({
      where: { userId: user.id, isActive: true },
      include: {
        logs: {
          where: { completedAt: { gte: today } },
          take: 1,
        },
      },
      orderBy: { createdAt: 'asc' },
    });

    const buttons = habits.map((habit) => {
      const completed = habit.logs.length > 0;
      const icon = completed ? '✅' : '⬜';
      return [
        {
          text: `${icon} ${habit.title}`,
          callback_data: `habit_toggle:${habit.id}`,
        },
      ];
    });

    const completedCount = habits.filter((h) => h.logs.length > 0).length;

    // Edit the existing message in-place
    await editTelegramMessage(
      chatId,
      messageId,
      `📋 <b>Today's Habits</b> (${completedCount}/${habits.length})\n\n` +
        `Tap a habit to toggle it:`,
      buttons
    );
  } catch (err) {
    console.error('[Telegram] toggleHabit error:', err);
  }
}

export default router;
