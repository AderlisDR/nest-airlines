import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import moment from 'moment';

@ValidatorConstraint({ name: 'isBefore', async: false })
export class IsBefore implements ValidatorConstraintInterface {
  validate(
    value: string,
    validationArguments?: ValidationArguments,
  ): boolean | Promise<boolean> {
    const maxDate = moment(
      validationArguments.object[validationArguments.constraints[0]],
      'YYYY-MM-DD HH:mm',
      true,
    );

    return moment(value, 'YYYY-MM-DD HH:mm', true).isBefore(maxDate);
  }

  defaultMessage?(validationArguments?: ValidationArguments): string {
    const maxDate =
      validationArguments.object[validationArguments.constraints[0]];

    return `${validationArguments.property} must be before ${maxDate}`;
  }
}
