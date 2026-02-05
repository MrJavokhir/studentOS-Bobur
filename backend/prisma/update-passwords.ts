import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

/**
 * Script to update admin/employer passwords in the database
 * Usage: ADMIN_PASSWORD=xxx EMPLOYER_PASSWORD=xxx npx tsx prisma/update-passwords.ts
 */
async function main() {
  console.log('🔐 Updating passwords...');

  const adminPassword = process.env.ADMIN_PASSWORD;
  const employerPassword = process.env.EMPLOYER_PASSWORD;

  if (!adminPassword || !employerPassword) {
    console.error('❌ ADMIN_PASSWORD and EMPLOYER_PASSWORD environment variables are required');
    console.error('   Usage: ADMIN_PASSWORD=xxx EMPLOYER_PASSWORD=xxx npx tsx prisma/update-passwords.ts');
    process.exit(1);
  }

  // Update admin password
  const adminHash = await bcrypt.hash(adminPassword, 12);
  const admin = await prisma.user.update({
    where: { email: 'admin@studentos.com' },
    data: { passwordHash: adminHash },
  });
  console.log('✅ Admin password updated:', admin.email);

  // Update employer passwords
  const employerHash = await bcrypt.hash(employerPassword, 12);
  
  const employer1 = await prisma.user.update({
    where: { email: 'hr@techflow.com' },
    data: { passwordHash: employerHash },
  });
  console.log('✅ Employer 1 password updated:', employer1.email);

  const employer2 = await prisma.user.update({
    where: { email: 'careers@innovatehub.io' },
    data: { passwordHash: employerHash },
  });
  console.log('✅ Employer 2 password updated:', employer2.email);

  console.log('\n🎉 All passwords updated successfully!');
  console.log('   Remember to keep your passwords secure and never commit them to git.');
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
