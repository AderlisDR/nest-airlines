import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';

export class UpdateAirportDto {
  @ApiPropertyOptional()
  @IsString()
  @Length(5, 100)
  @IsOptional()
  name: string;

  @ApiPropertyOptional()
  @IsString()
  @Length(5, 100)
  @IsOptional()
  city: string;

  @ApiPropertyOptional()
  @IsString()
  @Length(5, 100)
  @IsOptional()
  state: string;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isActive: boolean;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isArchived: boolean;
}
