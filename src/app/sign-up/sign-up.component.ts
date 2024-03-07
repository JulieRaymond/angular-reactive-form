import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  formBuilder = inject(FormBuilder);

  signUpForm = this.formBuilder.group(
    {
      name: this.formBuilder.group({
        firstname: ['', [Validators.required, Validators.minLength(2)]],
        lastname: ['', [Validators.required, Validators.minLength(2)]],
      }),
      email: ['', [Validators.required, Validators.email]],
      passwords: this.formBuilder.group({
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      }, {
        validator: this.checkEqualityValidator('password',
          'confirmPassword')
      }),
      adress: this.formBuilder.group({
        street: ['', Validators.required],
        zipCode: ['', Validators.required],
        city: ['', Validators.required],
      }),
    });


  checkEqualityValidator(controlName1: string, controlName2:
    string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors |
      null => {
      const password = control.get(controlName1);
      const confirmPassword = control.get(controlName2);
      const isValid = password?.value ===
        confirmPassword?.value;
      return isValid ? null : { 'notEqual': true };
    }
  }

  onSubmit() {
    console.log('Formulaire envoyé', this.signUpForm.value);
  }
}
