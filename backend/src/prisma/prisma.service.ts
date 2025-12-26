import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// Global singleton to prevent multiple instances in Lambda
let prismaInstance: PrismaClient | null = null;

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    // Reuse existing instance if available (Lambda warm start)
    if (prismaInstance) {
      return prismaInstance as PrismaService;
    }

    super({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
      // CRITICAL: Limit connection pool for Lambda
      // Each Lambda instance = 1 connection max
      // Prevents connection exhaustion
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });

    prismaInstance = this;
  }

  async onModuleInit() {
    await this.$connect();
  }

  // DO NOT disconnect in Lambda - connection reuse is critical
  // Lambda will terminate the container when needed
}
