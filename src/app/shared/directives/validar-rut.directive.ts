import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, FormControl } from '@angular/forms';
import { rutValidate, rutClean } from 'rut-helpers';

// tslint:disable-next-line
export function validarRutFactory(rutValidate: Function) {
  return (c: FormControl) => {
    return rutValidate(c.value) && algoritmoRango(c) ? null : { invalidRut: true };
  };
}

@Directive({
  selector: '[RutValidation][ngModel],[RutValidation][formControl]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => RutValidador), multi: true },
  ],
})
// tslint:disable-next-line
export class RutValidador {
  // tslint:disable-next-line
  private readonly validator: Function;

  constructor() {
    this.validator = validarRutFactory(rutValidate);
  }

/* A function that is called when the form is validated. */
  public validate(c: FormControl) {
    return this.validator(c);
  }
}

/**
 * It takes a FormControl as a parameter and returns true if the value of the FormControl is a valid
 * RUT.
 * @param {FormControl} c - FormControl =&gt; The form control that is being validated.
 * @returns A function that takes a FormControl and returns a boolean.
 */
export function algoritmoRango(c: FormControl): boolean {
  const value = rutClean(c.value);
  return /^[\d]{6,9}[0-9kK]{1}$/.test(value);
}
