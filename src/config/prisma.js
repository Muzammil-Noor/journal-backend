import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const dbUrl = process.env.DATABASE_URL;

let prisma;
if (dbUrl && dbUrl.startsWith('prisma+')) {
	prisma = new PrismaClient({ accelerateUrl: dbUrl });
} else {
	prisma = new PrismaClient({ datasources: { db: { url: dbUrl } } });
}

export { prisma };
