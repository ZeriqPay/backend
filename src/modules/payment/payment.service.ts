import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePaymentDto } from './dto/payment.dto';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  async createPayment(userId: string, data: CreatePaymentDto) {
    const transaction = await this.prisma.transaction.create({
      data: {
        userId,
        amount: data.amount,
        type: 'DEPOSIT',
        status: 'PENDING',
      },
    });

    return {
      success: true,
      transactionId: transaction.id,
      message: 'Pagamento iniciado com sucesso',
    };
  }

  async listPayments(userId: string) {
    const payments = await this.prisma.transaction.findMany({
      where: { userId, type: 'DEPOSIT' },
      orderBy: { createdAt: 'desc' },
    });

    return {
      success: true,
      payments,
    };
  }
}
