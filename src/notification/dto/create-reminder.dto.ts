import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReminderDto {
  @ApiProperty({
    description: 'ID uporabnika (UUID) iz Auth/Account servisa',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'Besedilo opomnika',
    example: 'Pay Netflix subscription',
  })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({
    description: 'Čas, kdaj naj se opomnik sproži (ISO 8601 datum/čas)',
    example: '2025-12-01T09:00:00.000Z',
  })
  @IsDateString()
  remindAt: string; // ISO string
}
