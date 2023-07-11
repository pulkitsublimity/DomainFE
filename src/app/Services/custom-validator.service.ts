import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorService {

  constructor() { }

  public comparePassword(conPass: string, pass: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      if (!(formGroup.get(conPass) as FormControl).value) {
        return null;
      }
      if (
        (formGroup.get(conPass) as FormControl).value ===
        (formGroup.get(pass) as FormControl).value
      ) {
        return null;
      } else
        (formGroup.get(conPass) as FormControl).setErrors({
          comparePassword: { valid: false },
        });
      return { comparePassword: { valid: false } };
    };
  }
}
