import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { NotificationChannel } from '../entities/notification.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateNotificationDto {
  @ApiProperty({
    description: 'ID uporabnika, ki prejme obvestilo',
    example: 1,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  userId: number;

  @ApiProperty({
    description: 'Naslov obvestila',
    example: 'Subscription payment due',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Vsebina obvestila',
    example: 'Your monthly subscription of 9.99 € is due tomorrow.',
  })
  @IsString()
  @IsNotEmpty()
  body: string;

  @ApiPropertyOptional({
    description: 'Kanal, preko katerega pošljemo obvestilo',
    enum: NotificationChannel,
    example: NotificationChannel.EMAIL,
  })
  @IsOptional()
  @IsEnum(NotificationChannel)
  channel?: NotificationChannel;

  @ApiPropertyOptional({
    description:
      'Izvor obvestila (npr. SUBSCRIPTION_SERVICE, GROUP_EXPENSE_SERVICE)',
    example: 'SUBSCRIPTION_SERVICE',
  })
  @IsOptional()
  @IsString()
  source?: string;
}
