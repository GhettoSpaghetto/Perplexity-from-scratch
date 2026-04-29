import { PrismaClient, AuthProvider, MessageRole } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter =new PrismaPg({
    connectionString: process.env.DIRECT_URL!
})

const prisma = new PrismaClient({
    adapter,
});

async function main() {
  console.log("🌱 Seeding users...");

  await prisma.user.deleteMany();

  await prisma.user.createMany({
    data: [
      {
        email: "alice@example.com",
        name: "Alice Johnson",
        provider: AuthProvider.Google,
      },
      {
        email: "bob@example.com",
        name: "Bob Smith",
        provider: AuthProvider.Github,
      },
      {
        email: "samarth.chikki.142@gmail.com",
        name: "Samarth Kaushal",
        provider: AuthProvider.Google
      }
    ],
    skipDuplicates: true, 
  });

  const count = await prisma.user.count();
  console.log(`✅ Seeded ${count} users`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });