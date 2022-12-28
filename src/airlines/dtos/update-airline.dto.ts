import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';

export class UpdateAirlineDto {
  @IsString()
  @Length(5, 100)
  @IsOptional()
  name: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;

  @IsBoolean()
  @IsOptional()
  isArchived: boolean;
}
