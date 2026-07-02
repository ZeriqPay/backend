import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma-service/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        username: true,
        avatar: true,
        balance: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return {
      success: true,
      user,
    };
  }

  async getBalance(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { balance: true },
    });

    return {
      success: true,
      balance: user?.balance || 0,
    };
  }
}
