import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const testUser = await prisma.user.upsert({
    where: {
      email: 'user@mail.com',
    },
    update: {},
    create: {
      email: 'user@mail.com',
      passwordHash:
        '0ae927c12544ea131eb40c9e107e248f1d640a5773fa223d6ca258e87d4d28635a390403599efc0b13477acc31761c2a86501deea0cf1d39ac12c2894422063f',
      salt: 'b27fbc0d1e903f271e7660c37495c8d5',
    },
  });

  console.log(`Created test user ${testUser.email}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })

  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });
