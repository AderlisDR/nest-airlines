import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';

export class UpdateAirlineDto {
  @ApiPropertyOptional()
  @IsString()
  @Length(5, 100)
  @IsOptional()
  name: string;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isActive: boolean;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isArchived: boolean;
}
