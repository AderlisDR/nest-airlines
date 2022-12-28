import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import moment from 'moment';

@ValidatorConstraint({ name: 'datetimeFormat', async: false })
export class DateTimeFormat implements ValidatorConstraintInterface {
  validate(
    value: string,
    validationArguments?: ValidationArguments,
  ): boolean | Promise<boolean> {
    return moment(value, 'YYYY-MM-DD HH:mm', true).isValid();
  }

  defaultMessage?(validationArguments?: ValidationArguments): string {
    return `${validationArguments.property} must be in 'YYY-MM-DD HH:mm' format`;
  }
}
