import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { AffiliateService } from './affiliate.service';
import { CreateAffiliateCodeDto } from './dto/affiliate.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('affiliate')
@UseGuards(JwtAuthGuard)
export class AffiliateController {
  constructor(private readonly affiliateService: AffiliateService) {}

  @Post('create-code')
  async createCode(@Request() req, @Body() data: CreateAffiliateCodeDto) {
    return this.affiliateService.createCode(req.user.id, data);
  }

  @Get('stats')
  async getStats(@Request() req) {
    return this.affiliateService.getMyStats(req.user.id);
  }
}
