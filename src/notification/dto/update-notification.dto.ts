import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateNotificationDto {
  @ApiPropertyOptional({
    description: 'Ali je uporabnik obvestilo že prebral',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  read?: boolean;

  @ApiPropertyOptional({
    description: 'Posodobljen naslov obvestila',
    example: 'Subscription payment processed',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    description: 'Posodobljena vsebina obvestila',
    example: 'Your subscription payment was successfully processed.',
  })
  @IsOptional()
  @IsString()
  body?: string;
}
