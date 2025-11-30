import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReminderDto {
  @ApiProperty({
    description: 'ID uporabnika, za katerega se ustvari opomnik',
    example: 1,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  userId: number;

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
