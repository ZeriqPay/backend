import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateWithdrawDto } from './dto/withdraw.dto';

@Injectable()
export class WithdrawService {
  constructor(private prisma: PrismaService) {}

  async createWithdraw(userId: string, data: CreateWithdrawDto) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    
    if (!user || user.balance.toNumber() < data.amount) {
      throw new BadRequestException('Saldo insuficiente');
    }

    const withdraw = await this.prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: userId },
        data: { balance: { decrement: data.amount } },
      });

      return tx.withdraw.create({
        data: {
          userId,
          amount: data.amount,
          address: data.address,
          status: 'PENDING',
        },
      });
    });

    return {
      success: true,
      withdrawId: withdraw.id,
      message: 'Solicitação de saque criada com sucesso',
    };
  }

  async listWithdraws(userId: string) {
    const withdraws = await this.prisma.withdraw.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return {
      success: true,
      withdraws,
    };
  }
}
