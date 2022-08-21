import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
  const { date } = JSON.parse(req.body);

  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL
      }
    }
  });

  try {
    const response = await prisma.dates.create({
      data: {
        date: new Date(date)
      }
    });

    res.status(200).json({
      message: 'A ok!',
      data: {
        date: new Date(response.date).toLocaleString()
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Blast! There's been an error.", error: error });
  } finally {
    prisma.$disconnect();
  }
}
