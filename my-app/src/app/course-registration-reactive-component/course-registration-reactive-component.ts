import { Component } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-course-registration-reactive-component',
  standalone: false,
  styleUrl: './course-registration-reactive-component.css',
  templateUrl: './course-registration-reactive-component.html',
})
export class CourseRegistrationReactiveComponent {
  public regForm: FormGroup = new FormGroup(
    {
      name: new FormControl('Nguyễn Nhựt Thụy',[Validators.minLength(3),this.customNameValidator]),
      email: new FormControl('nhuthuy945@gmail.com',[Validators.required, Validators.email]),
      password: new FormControl('123456', [Validators.required, this.customPasswordValidator]),
      confirmPass: new FormControl('123456')
    }
  );

  setDefaultValues() {
    this.regForm.setValue({
      name: 'Nguyễn Nhựt Thụy',
      email: 'nhuthuy945@gmail.com',
      password: '123456',
      confirmPass: '123456'
    });
  }
  
  customNameValidator(control:AbstractControl):{[key:string]: any } | null
  {
    const matchName = /[@#$%^&]/g.test(control.value);
    return matchName ? { 'nameNotMatch': {value: control.value}}: null; 
  }

  customPasswordValidator(control: AbstractControl): ValidationErrors | null {
    const password: string = control.value ?? '';
    // Để Validators.required xử lý mật khẩu trống.
    if (!password) return null;

    const pattern = /^(?=[\s\S]*[A-Z])(?=[\s\S]*[0-9])(?=[\s\S]*[\p{P}\p{S}])[\s\S]{8,}$/u;
    if (pattern.test(password)) return null;

    return {
      passwordInvalid: {
        minLength: password.length < 8,
        uppercase: !/[A-Z]/.test(password),
        digit: !/[0-9]/.test(password),
        special: !/[\p{P}\p{S}]/u.test(password)
      }
    };
  }
}