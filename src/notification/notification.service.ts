import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reminder } from './entities/reminder.entity';
import { Notification } from './entities/notification.entity';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { EmailService } from './email.service';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Reminder)
    private readonly reminderRepo: Repository<Reminder>,
    @InjectRepository(Notification)
    private readonly notificationRepo: Repository<Notification>,
    private readonly emailService: EmailService,
    private readonly httpService: HttpService, // za klic druge mikrostoritve (npr. Auth)
  ) {}

  // ---------- REMINDERS ----------

  async createReminder(dto: CreateReminderDto): Promise<Reminder> {
    const reminder = this.reminderRepo.create({
      userId: dto.userId,
      message: dto.message,
      remindAt: new Date(dto.remindAt),
    });
    return this.reminderRepo.save(reminder);
  }

  async findAllRemindersForUser(userId: number): Promise<Reminder[]> {
    return this.reminderRepo.find({
      where: { userId },
      order: { remindAt: 'ASC' },
    });
  }

  async findOneReminder(id: number): Promise<Reminder> {
    const reminder = await this.reminderRepo.findOne({ where: { id } });
    if (!reminder) throw new NotFoundException('Reminder not found');
    return reminder;
  }

  async updateReminder(id: number, dto: UpdateReminderDto): Promise<Reminder> {
    const reminder = await this.findOneReminder(id);
    if (dto.message !== undefined) reminder.message = dto.message;
    if (dto.remindAt !== undefined) reminder.remindAt = new Date(dto.remindAt);
    if (dto.processed !== undefined) reminder.processed = dto.processed;
    return this.reminderRepo.save(reminder);
  }

  async removeReminder(id: number): Promise<void> {
    const result = await this.reminderRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Reminder not found');
    }
  }

  // to bi v realnem sistemu klical scheduler (cron job) za opomnike
  async processDueReminders(): Promise<void> {
    const now = new Date();
    const dueReminders = await this.reminderRepo.find({
      where: { processed: false },
    });

    for (const r of dueReminders) {
      if (r.remindAt <= now) {
        // ustvari notification
        await this.createNotification({
          userId: r.userId,
          title: 'Payment reminder',
          body: r.message,
          source: 'REMINDER_SERVICE',
        });
        r.processed = true;
        await this.reminderRepo.save(r);
      }
    }
  }

  // ---------- NOTIFICATIONS ----------

  async createNotification(dto: CreateNotificationDto): Promise<Notification> {
    const notification = this.notificationRepo.create(dto);
    const saved = await this.notificationRepo.save(notification);

    // primer: klic Auth servisa za email in pošiljanje email notifikacije
    const authUrl = process.env.AUTH_SERVICE_URL || 'http://auth-service:3000';
    try {
      const userResponse = await firstValueFrom(
        this.httpService.get(`${authUrl}/users/${dto.userId}`),
      );
      const email = userResponse.data.email;
      await this.emailService.sendEmail(email, dto.title, dto.body);
    } catch (e) {
      // če Auth ali email faila, še vedno hranimo notification v bazi
      // lahko zlogiraš, za nalogo ni nujno več
      console.error('Failed to send email notification:', e.message);
    }

    return saved;
  }

  async findNotificationsForUser(userId: number): Promise<Notification[]> {
    return this.notificationRepo.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findOneNotification(id: number): Promise<Notification> {
    const notification = await this.notificationRepo.findOne({ where: { id } });
    if (!notification) throw new NotFoundException('Notification not found');
    return notification;
  }

  async markNotificationAsRead(id: number): Promise<Notification> {
    const notification = await this.findOneNotification(id);
    notification.read = true;
    return this.notificationRepo.save(notification);
  }

  async updateNotification(
    id: number,
    dto: UpdateNotificationDto,
  ): Promise<Notification> {
    const notification = await this.findOneNotification(id);
    if (dto.read !== undefined) notification.read = dto.read;
    if (dto.title !== undefined) notification.title = dto.title;
    if (dto.body !== undefined) notification.body = dto.body;
    return this.notificationRepo.save(notification);
  }

  async removeNotification(id: number): Promise<void> {
    const result = await this.notificationRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Notification not found');
    }
  }

  async removeAllNotificationsForUser(userId: number): Promise<void> {
    await this.notificationRepo.delete({ userId });
  }
}
