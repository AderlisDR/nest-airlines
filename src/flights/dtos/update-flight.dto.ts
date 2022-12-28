import {
  IsBoolean,
  IsOptional,
  IsString,
  Length,
  Validate,
} from 'class-validator';
import moment from 'moment';
import { DateTimeFormat } from '../../validators/datetime-format.validator';
import { IsAfter } from '../../validators/is-after.validator';
import { IsBefore } from '../../validators/is-before.validator';
import { MinDate } from '../../validators/min-date.validator';
import { NotEqual } from '../../validators/not-equal.validator';

export class UpdateFlightDto {
  @IsString()
  @Length(5, 100)
  @Validate(NotEqual, ['destination'])
  @IsOptional()
  source: string;

  @IsString()
  @Length(5, 100)
  @Validate(NotEqual, ['source'])
  @IsOptional()
  destination: string;

  @Validate(DateTimeFormat)
  @Validate(MinDate, [moment().format('YYYY-MM-DD HH:mm')])
  @Validate(IsBefore, ['arrivalDateTime'])
  @IsOptional()
  departurDateTime: string;

  @Validate(DateTimeFormat)
  @Validate(IsAfter, ['departurDateTime'])
  @IsOptional()
  arrivalDateTime: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;

  @IsBoolean()
  @IsOptional()
  isArchived: boolean;
}
