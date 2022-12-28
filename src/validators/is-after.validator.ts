import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import moment from 'moment';

@ValidatorConstraint({ name: 'isAfter', async: false })
export class IsAfter implements ValidatorConstraintInterface {
  validate(
    value: string,
    validationArguments?: ValidationArguments,
  ): boolean | Promise<boolean> {
    const minDate = moment(
      validationArguments.object[validationArguments.constraints[0]],
      'YYYY-MM-DD HH:mm',
      true,
    );

    return moment(value, 'YYYY-MM-DD HH:mm', true).isAfter(minDate);
  }

  defaultMessage?(validationArguments?: ValidationArguments): string {
    const minDate =
      validationArguments.object[validationArguments.constraints[0]];

    return `${validationArguments.property} must be after ${minDate}`;
  }
}
