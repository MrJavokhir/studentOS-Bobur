import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// =============================================================================
// TOOLS ENDPOINTS
// =============================================================================

// GET /admin/tools - List all tools
router.get('/tools', async (req, res) => {
  try {
    const tools = await prisma.tool.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { usages: true },
        },
      },
    });

    res.json({
      success: true,
      data: tools.map((tool) => ({
        ...tool,
        usageCount: tool._count.usages,
        _count: undefined,
      })),
    });
  } catch (error) {
    console.error('Error fetching tools:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch tools' });
  }
});

// POST /admin/tools - Create new tool
router.post('/tools', async (req, res) => {
  try {
    const { name, slug, description, category, icon, creditCost, isActive } = req.body;

    if (!name || !slug || !category) {
      return res.status(400).json({
        success: false,
        error: 'Name, slug, and category are required',
      });
    }

    // Check if slug already exists
    const existing = await prisma.tool.findUnique({ where: { slug } });
    if (existing) {
      return res.status(400).json({
        success: false,
        error: 'A tool with this slug already exists',
      });
    }

    const tool = await prisma.tool.create({
      data: {
        name,
        slug,
        description: description || null,
        category,
        icon: icon || null,
        creditCost: creditCost || 0,
        isActive: isActive !== false,
      },
    });

    res.status(201).json({ success: true, data: tool });
  } catch (error) {
    console.error('Error creating tool:', error);
    res.status(500).json({ success: false, error: 'Failed to create tool' });
  }
});

// PATCH /admin/tools/:id - Update tool
router.patch('/tools/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, description, category, icon, creditCost, isActive } = req.body;

    const tool = await prisma.tool.update({
      where: { id: id as string },
      data: {
        ...(name !== undefined && { name }),
        ...(slug !== undefined && { slug }),
        ...(description !== undefined && { description }),
        ...(category !== undefined && { category }),
        ...(icon !== undefined && { icon }),
        ...(creditCost !== undefined && { creditCost }),
        ...(isActive !== undefined && { isActive }),
      },
    });

    res.json({ success: true, data: tool });
  } catch (error) {
    console.error('Error updating tool:', error);
    res.status(500).json({ success: false, error: 'Failed to update tool' });
  }
});

// PATCH /admin/tools/:id/toggle - Toggle tool active status
router.patch('/tools/:id/toggle', async (req, res) => {
  try {
    const { id } = req.params;

    const tool = await prisma.tool.findUnique({ where: { id: id as string } });
    if (!tool) {
      return res.status(404).json({ success: false, error: 'Tool not found' });
    }

    const updated = await prisma.tool.update({
      where: { id: id as string },
      data: { isActive: !tool.isActive },
    });

    res.json({ success: true, data: updated });
  } catch (error) {
    console.error('Error toggling tool:', error);
    res.status(500).json({ success: false, error: 'Failed to toggle tool' });
  }
});

// DELETE /admin/tools/:id - Delete tool
router.delete('/tools/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.tool.delete({ where: { id: id as string } });

    res.json({ success: true, message: 'Tool deleted successfully' });
  } catch (error) {
    console.error('Error deleting tool:', error);
    res.status(500).json({ success: false, error: 'Failed to delete tool' });
  }
});

// =============================================================================
// APP SETTINGS ENDPOINTS
// =============================================================================

// GET /admin/settings - Get all settings
router.get('/settings', async (req, res) => {
  try {
    const settings = await prisma.appSettings.findMany();

    // Convert to object format
    const settingsObject: Record<string, string> = {};
    settings.forEach((s) => {
      settingsObject[s.key] = s.value;
    });

    res.json({ success: true, data: settingsObject });
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch settings' });
  }
});

// PATCH /admin/settings - Update settings
router.patch('/settings', async (req, res) => {
  try {
    const updates = req.body;

    if (!updates || typeof updates !== 'object') {
      return res.status(400).json({
        success: false,
        error: 'Settings object is required',
      });
    }

    // Update each setting
    for (const [key, value] of Object.entries(updates)) {
      await prisma.appSettings.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value) },
      });
    }

    // Return updated settings
    const settings = await prisma.appSettings.findMany();
    const settingsObject: Record<string, string> = {};
    settings.forEach((s) => {
      settingsObject[s.key] = s.value;
    });

    res.json({ success: true, data: settingsObject });
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).json({ success: false, error: 'Failed to update settings' });
  }
});

export default router;
