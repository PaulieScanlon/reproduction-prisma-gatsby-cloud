const { PrismaClient } = require('@prisma/client');
const requestIp = require('request-ip');
const geoip = require('fast-geoip');

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
    const ip = await requestIp.getClientIp(req);
    const geo = await geoip.lookup(ip);

    const response = await prisma.dates.create({
      data: {
        date: new Date(date),
        location: geo ? geo : 'localhost'
      }
    });

    res.status(200).json({
      message: 'A ok!',
      data: {
        date: new Date(response.date).toLocaleString(),
        location: response.location
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Blast! There's been an error.", error: error });
  } finally {
    prisma.$disconnect();
  }
}
