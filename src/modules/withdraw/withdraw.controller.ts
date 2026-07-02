import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { WithdrawService } from './withdraw.service';
import { CreateWithdrawDto } from './dto/withdraw.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('withdraw')
@UseGuards(JwtAuthGuard)
export class WithdrawController {
  constructor(private readonly withdrawService: WithdrawService) {}

  @Post('create')
  async createWithdraw(@Request() req, @Body() data: CreateWithdrawDto) {
    return this.withdrawService.createWithdraw(req.user.id, data);
  }

  @Get('list')
  async listWithdraws(@Request() req) {
    return this.withdrawService.listWithdraws(req.user.id);
  }
}
