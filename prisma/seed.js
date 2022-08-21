import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const test_date_1 = await prisma.locations.create({
    data: {
      date: new Date()
    }
  });

  console.log({ test_date_1 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
