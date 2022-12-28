import { IsString, IsUUID, Length, Matches, Validate } from 'class-validator';
import { DateTimeFormat } from '../../validators/datetime-format.validator';
import { IsAfter } from '../../validators/is-after.validator';
import { IsBefore } from '../../validators/is-before.validator';
import { MinDate } from '../../validators/min-date.validator';
import { NotEqual } from '../../validators/not-equal.validator';
import moment from 'moment';

export class CreateFlightDto {
  @IsString()
  @Matches(/^\d{3,4}$/)
  number: string;

  @IsString()
  @Length(5, 100)
  @Validate(NotEqual, ['destination'])
  source: string;

  @IsString()
  @Length(5, 100)
  @Validate(NotEqual, ['source'])
  destination: string;

  @Validate(DateTimeFormat)
  @Validate(MinDate, [moment().format('YYYY-MM-DD HH:mm')])
  @Validate(IsBefore, ['arrivalDateTime'])
  departurDateTime: string;

  @Validate(DateTimeFormat)
  @Validate(IsAfter, ['departurDateTime'])
  arrivalDateTime: string;

  @IsUUID()
  airlineId: string;
}
