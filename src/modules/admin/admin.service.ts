import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers() {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        balance: true,
        role: true,
        createdAt: true,
      },
    });

    return {
      success: true,
      users,
    };
  }

  async getStats() {
    const totalUsers = await this.prisma.user.count();
    const totalTransactions = await this.prisma.transaction.count();
    const totalWithdraws = await this.prisma.withdraw.count();

    return {
      success: true,
      stats: {
        totalUsers,
        totalTransactions,
        totalWithdraws,
      },
    };
  }
}
