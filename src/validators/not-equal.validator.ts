import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'notEqual', async: false })
export class NotEqual implements ValidatorConstraintInterface {
  validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): boolean | Promise<boolean> {
    return (
      value !== validationArguments.object[validationArguments.constraints[0]]
    );
  }

  defaultMessage?(validationArguments?: ValidationArguments): string {
    return `"${validationArguments.property}" must be different to "${validationArguments.constraints[0]}"`;
  }
}
