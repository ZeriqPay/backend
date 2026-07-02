import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/payment.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('payment')
@UseGuards(JwtAuthGuard)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create')
  async createPayment(@Request() req, @Body() data: CreatePaymentDto) {
    return this.paymentService.createPayment(req.user.id, data);
  }

  @Get('list')
  async listPayments(@Request() req) {
    return this.paymentService.listPayments(req.user.id);
  }
}
