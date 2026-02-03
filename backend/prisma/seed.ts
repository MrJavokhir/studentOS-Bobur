import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@studentos.com' },
    update: {},
    create: {
      email: 'admin@studentos.com',
      passwordHash: adminPassword,
      role: 'ADMIN',
      emailVerified: true,
      studentProfile: {
        create: {
          fullName: 'Admin User',
          profileCompletion: 100,
        },
      },
    },
  });
  console.log('✅ Admin user created:', admin.email);

  // Create sample employer
  const employerPassword = await bcrypt.hash('employer123', 12);
  const employer = await prisma.user.upsert({
    where: { email: 'hr@techflow.com' },
    update: {},
    create: {
      email: 'hr@techflow.com',
      passwordHash: employerPassword,
      role: 'EMPLOYER',
      emailVerified: true,
      employerProfile: {
        create: {
          companyName: 'TechFlow Inc.',
          tagline: 'Innovating the future of tech',
          industry: 'Software Development',
          companySize: '11-50 employees',
          description: 'TechFlow is a cutting-edge software company focused on building innovative solutions.',
          website: 'https://techflow.com',
          city: 'San Francisco',
          state: 'CA',
          country: 'United States',
        },
      },
    },
  });
  console.log('✅ Employer user created:', employer.email);

  // Get employer profile for job creation
  const employerProfile = await prisma.employerProfile.findUnique({
    where: { userId: employer.id },
  });

  // Create sample jobs
  const jobs = [
    {
      title: 'Junior Frontend Developer',
      company: 'TechFlow Inc.',
      location: 'San Francisco, CA',
      locationType: 'REMOTE' as const,
      salaryMin: 70000,
      salaryMax: 90000,
      department: 'Engineering',
      description: 'We are looking for a passionate Junior Frontend Developer to join our growing team.',
      requirements: ['React/Vue experience', 'TypeScript knowledge', 'CSS/Tailwind proficiency'],
      responsibilities: ['Build responsive UIs', 'Collaborate with design team', 'Write clean code'],
      benefits: ['Remote work', 'Health insurance', '401k matching'],
      employerId: employerProfile!.id,
    },
    {
      title: 'UX/UI Design Intern',
      company: 'TechFlow Inc.',
      location: 'New York, NY',
      locationType: 'HYBRID' as const,
      salaryMin: 40000,
      salaryMax: 50000,
      department: 'Design',
      description: 'Join our design team and help create beautiful user experiences.',
      requirements: ['Figma proficiency', 'Portfolio required', 'Design fundamentals'],
      responsibilities: ['Create wireframes', 'Design prototypes', 'User research'],
      benefits: ['Mentorship program', 'Flexible hours'],
      employerId: employerProfile!.id,
    },
  ];

  for (const job of jobs) {
    await prisma.job.upsert({
      where: { id: job.title.toLowerCase().replace(/\s+/g, '-') },
      update: {},
      create: job,
    });
  }
  console.log('✅ Sample jobs created');

  // Create sample scholarships
  const scholarships = [
    {
      title: 'Global Excellence Scholarship',
      institution: 'Harvard University',
      country: 'United States',
      studyLevel: 'Undergraduate',
      awardType: 'Full Tuition',
      awardAmount: 'Up to $50,000/year',
      deadline: new Date('2026-03-15'),
      description: 'Merit-based scholarship for outstanding international students.',
      applicationUrl: 'https://harvard.edu/scholarships',
    },
    {
      title: 'Future Leaders Award',
      institution: 'Oxford University',
      country: 'United Kingdom',
      studyLevel: 'Postgraduate',
      awardType: 'Partial Funding',
      awardAmount: '£15,000',
      deadline: new Date('2026-04-01'),
      description: 'For students demonstrating exceptional leadership potential.',
      applicationUrl: 'https://ox.ac.uk/scholarships',
    },
    {
      title: 'STEM Innovation Grant',
      institution: 'MIT',
      country: 'United States',
      studyLevel: 'Undergraduate',
      awardType: 'Research Grant',
      awardAmount: '$25,000',
      deadline: new Date('2026-02-28'),
      description: 'Supporting innovative research in science and technology.',
      applicationUrl: 'https://mit.edu/grants',
    },
  ];

  for (const scholarship of scholarships) {
    await prisma.scholarship.create({
      data: scholarship,
    });
  }
  console.log('✅ Sample scholarships created');

  // Create pricing plans
  const plans = [
    {
      name: 'Free',
      price: 0,
      interval: 'MONTHLY' as const,
      features: ['Basic job search', 'Limited scholarships', '3 CV analyses/month'],
      isActive: true,
    },
    {
      name: 'Pro',
      price: 9.99,
      interval: 'MONTHLY' as const,
      features: ['Unlimited job search', 'All scholarships', 'Unlimited CV analyses', 'AI cover letters', 'Priority support'],
      isActive: true,
      isPopular: true,
    },
    {
      name: 'Enterprise',
      price: 29.99,
      interval: 'MONTHLY' as const,
      features: ['Everything in Pro', 'Team features', 'Custom integrations', 'Dedicated support'],
      isActive: true,
    },
  ];

  for (const plan of plans) {
    await prisma.pricingPlan.create({
      data: plan,
    });
  }
  console.log('✅ Pricing plans created');

  console.log('🎉 Database seeded successfully!');
  console.log('\n📋 Test credentials:');
  console.log('   Admin: admin@studentos.com / admin123');
  console.log('   Employer: hr@techflow.com / employer123');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
