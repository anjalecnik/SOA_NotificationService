import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { Reminder } from './entities/reminder.entity';
import { Notification } from './entities/notification.entity';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { EmailService } from './email.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reminder, Notification]),
    HttpModule // omogoča klic druge mikrostoritve
  ],
  controllers: [NotificationController],
  providers: [NotificationService, EmailService]
})
export class NotificationModule {}
