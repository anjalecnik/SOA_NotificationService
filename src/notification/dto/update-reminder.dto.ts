import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateReminderDto {
  @ApiPropertyOptional({
    description: 'Posodobljeno besedilo opomnika',
    example: 'Pay electricity bill',
  })
  @IsOptional()
  @IsString()
  message?: string;

  @ApiPropertyOptional({
    description: 'Nov čas, kdaj naj se opomnik sproži (ISO 8601)',
    example: '2025-12-05T18:30:00.000Z',
  })
  @IsOptional()
  @IsDateString()
  remindAt?: string;

  @ApiPropertyOptional({
    description: 'Ali je bil opomnik že obdelan (sprožen)',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  processed?: boolean;
}
