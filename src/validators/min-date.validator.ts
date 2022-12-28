import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import moment from 'moment';

@ValidatorConstraint({ name: 'minDate', async: false })
export class MinDate implements ValidatorConstraintInterface {
  validate(
    value: string,
    validationArguments?: ValidationArguments,
  ): boolean | Promise<boolean> {
    const minDate = moment(validationArguments.constraints[0]);

    return moment(value, 'YYYY-MM-DD HH:mm', true).isAfter(minDate);
  }

  defaultMessage?(validationArguments?: ValidationArguments): string {
    const minDate = validationArguments.constraints[0];

    return `minimal allowed date for departurDateTime is ${minDate}`;
  }
}
