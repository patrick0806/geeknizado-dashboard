import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query', 'error', 'warn'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

//prisma commands
// npx prisma migrate dev --name init (cria uma migração)
//npx prisma studio (roda o prisma studio)
//npx prisma db push (sincronizar database)
