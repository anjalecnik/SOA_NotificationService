import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('reminders', 'notifications')
@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('reminders')
  @ApiTags('reminders')
  @ApiOperation({ summary: 'Create a new reminder' })
  @ApiResponse({ status: 201, description: 'Reminder created successfully.' })
  createReminder(@Body() dto: CreateReminderDto) {
    return this.notificationService.createReminder(dto);
  }

  @Get('reminders/user/:userId')
  @ApiTags('reminders')
  @ApiOperation({ summary: 'Get all reminders for a user' })
  @ApiResponse({ status: 200, description: 'List of reminders returned.' })
  getRemindersForUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.notificationService.findAllRemindersForUser(userId);
  }

  @Get('reminders/:id')
  @ApiTags('reminders')
  @ApiOperation({ summary: 'Get a single reminder by ID' })
  @ApiResponse({ status: 200, description: 'Reminder returned.' })
  @ApiResponse({ status: 404, description: 'Reminder not found.' })
  getReminder(@Param('id', ParseIntPipe) id: number) {
    return this.notificationService.findOneReminder(id);
  }

  @Put('reminders/:id')
  @ApiTags('reminders')
  @ApiOperation({ summary: 'Update reminder by ID' })
  @ApiResponse({ status: 200, description: 'Reminder updated successfully.' })
  updateReminder(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateReminderDto,
  ) {
    return this.notificationService.updateReminder(id, dto);
  }

  @Delete('reminders/:id')
  @ApiTags('reminders')
  @ApiOperation({ summary: 'Delete a reminder by ID' })
  @ApiResponse({ status: 200, description: 'Reminder deleted.' })
  deleteReminder(@Param('id', ParseIntPipe) id: number) {
    return this.notificationService.removeReminder(id);
  }

  @Post('reminders/process-due')
  @ApiTags('reminders')
  @ApiOperation({
    summary: 'Process and send due reminders',
    description:
      'Manually trigger processing of reminders that are past their remindAt timestamp.',
  })
  @ApiResponse({ status: 200, description: 'Due reminders processed.' })
  processDueReminders() {
    return this.notificationService.processDueReminders();
  }

  // ---------------------------------------------
  // ⚡ NOTIFICATIONS
  // ---------------------------------------------

  @Post('notifications')
  @ApiTags('notifications')
  @ApiOperation({ summary: 'Create a new notification' })
  @ApiResponse({
    status: 201,
    description: 'Notification created successfully.',
  })
  createNotification(@Body() dto: CreateNotificationDto) {
    return this.notificationService.createNotification(dto);
  }

  @Get('notifications/user/:userId')
  @ApiTags('notifications')
  @ApiOperation({ summary: 'Get notifications for a user' })
  @ApiResponse({ status: 200, description: 'List of notifications returned.' })
  getNotificationsForUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.notificationService.findNotificationsForUser(userId);
  }

  @Get('notifications/:id')
  @ApiTags('notifications')
  @ApiOperation({ summary: 'Get a single notification by ID' })
  @ApiResponse({ status: 200, description: 'Notification returned.' })
  @ApiResponse({ status: 404, description: 'Notification not found.' })
  getNotification(@Param('id', ParseIntPipe) id: number) {
    return this.notificationService.findOneNotification(id);
  }

  @Put('notifications/:id')
  @ApiTags('notifications')
  @ApiOperation({ summary: 'Update a notification' })
  @ApiResponse({
    status: 200,
    description: 'Notification updated successfully.',
  })
  updateNotification(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateNotificationDto,
  ) {
    return this.notificationService.updateNotification(id, dto);
  }

  @Put('notifications/:id/read')
  @ApiTags('notifications')
  @ApiOperation({ summary: 'Mark notification as read' })
  @ApiResponse({ status: 200, description: 'Notification marked as read.' })
  markNotificationRead(@Param('id', ParseIntPipe) id: number) {
    return this.notificationService.markNotificationAsRead(id);
  }

  @Delete('notifications/:id')
  @ApiTags('notifications')
  @ApiOperation({ summary: 'Delete a notification by ID' })
  @ApiResponse({ status: 200, description: 'Notification deleted.' })
  deleteNotification(@Param('id', ParseIntPipe) id: number) {
    return this.notificationService.removeNotification(id);
  }

  @Delete('notifications/user/:userId')
  @ApiTags('notifications')
  @ApiOperation({ summary: 'Delete ALL notifications for a user' })
  @ApiResponse({ status: 200, description: 'All notifications deleted.' })
  deleteNotificationsForUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.notificationService.removeAllNotificationsForUser(userId);
  }
}
