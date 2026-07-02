import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { PaymentModule } from './modules/payment/payment.module';
import { WithdrawModule } from './modules/withdraw/withdraw.module';
import { AffiliateModule } from './modules/affiliate/affiliate.module';
import { AdminModule } from './modules/admin/admin.module';
import { ApiKeyModule } from './modules/api-key/api-key.module';
import { SecurityModule } from './modules/security/security.module';
import { SessionModule } from './modules/session/session.module';
import { PlanModule } from './modules/plan/plan.module';
import { TicketModule } from './modules/ticket/ticket.module';
import { WebhookModule } from './modules/webhook/webhook.module';
import { NotificationModule } from './modules/notification/notification.module';
import { CategoryModule } from './modules/category/category.module';
import { AiModule } from './modules/ai/ai.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 100,
    }]),
    PrismaModule,
    AuthModule,
    UserModule,
    PaymentModule,
    WithdrawModule,
    AffiliateModule,
    AdminModule,
    ApiKeyModule,
    SecurityModule,
    SessionModule,
    PlanModule,
    TicketModule,
    WebhookModule,
    NotificationModule,
    CategoryModule,
    AiModule,
  ],
})
export class AppModule {}
