import React from "react";
import { ValidatorComponent, ValidatorForm } from "react-material-ui-form-validator";
import { KeyboardDatePicker } from "@material-ui/pickers";
import moment from "moment";

class ValidatedDatePicker extends ValidatorComponent {
  renderValidatorComponent() {
    const {
      errorMessages,
      validators,
      requiredError,
      helperText,
      validatorListener,
      ...rest
    } = this.props;
    const { isValid } = this.state;
    return (
      <KeyboardDatePicker
        {...rest}
        error={!isValid}
        helperText={(!isValid && this.getErrorMessage()) || helperText}
      />
    );
  }
}

ValidatorForm.addValidationRule('isValidDate', (value) => {
  if (value === null) {
    return true;
  }
  const date = new Date(value);
  return date.toString() !== 'Invalid Date';
});

ValidatorForm.addValidationRule("isHigherActualDate", (value) => {
  if (moment(value).isValid()) {
    let date = new Date();
    if(date.setDate(date.getDate() - 1) > moment(value))
      return false;
  }
  return true;
});

ValidatorForm.addValidationRule("isLowerActualDate", (value) => {
  if (moment(value).isValid()) {
    if(new Date() < moment(value))
      return false;
  }
  return true;
});

export default ValidatedDatePicker;