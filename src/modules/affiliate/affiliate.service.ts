import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAffiliateCodeDto } from './dto/affiliate.dto';

@Injectable()
export class AffiliateService {
  constructor(private prisma: PrismaService) {}

  async createCode(userId: string, data: CreateAffiliateCodeDto) {
    const existing = await this.prisma.affiliateCode.findFirst({
      where: { OR: [{ userId }, { code: data.code }] },
    });

    if (existing) {
      throw new BadRequestException('Código ou usuário já possui um vínculo de afiliado');
    }

    const affiliate = await this.prisma.affiliateCode.create({
      data: {
        userId,
        code: data.code,
      },
    });

    return {
      success: true,
      code: affiliate.code,
    };
  }

  async getMyStats(userId: string) {
    const affiliate = await this.prisma.affiliateCode.findUnique({
      where: { userId },
    });

    if (!affiliate) {
      throw new BadRequestException('Você não é um afiliado');
    }

    return {
      success: true,
      stats: {
        code: affiliate.code,
        referrals: 0, // Placeholder
        earnings: 0,  // Placeholder
      },
    };
  }
}
