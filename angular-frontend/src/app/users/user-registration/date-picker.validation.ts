// import {Component} from '@angular/core';
//
// @Component({
//   selector: 'date-picker.validation',
//   templateUrl: './user-registration.component.html',
// })
// export class DatePickerValidation {
//   minDate: Date;
//   maxDate: Date;
//
//   constructor() {
//     // Set the minimum to January 1st 20 years in the past and December 31st a year in the future.
//     const currentDate = new Date()
//     this.minDate = new Date( - 150, 0, 1);
//     this.maxDate = new Date( + 0, 0, +1);
//   }
//   }
import {AbstractControl, ValidatorFn} from "@angular/forms";

export function dateValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const today = new Date().getTime();
    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 150);

    if(!(control && control.value)) {
      // if there's no control or no value, that's ok
      return null;
    }
    const birthdayDate = new Date(control.value);
    // return null if there's no errors
    if (birthdayDate.getTime() > today) {
      return { invalidDate: 'Invalid date! Please select a proper date. Or were you born in the future?' };
    }
    if (birthdayDate.getTime() < minDate.getTime()) {
      return { invalidDate: 'Wow! You lived more than 150 years? Please select a valid date' };
    }
    return null;
  }
}
