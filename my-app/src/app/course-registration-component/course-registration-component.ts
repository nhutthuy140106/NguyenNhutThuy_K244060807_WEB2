import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-course-registration-component',
  standalone: false,
  styleUrl: './course-registration-component.css',
  templateUrl: './course-registration-component.html',
})
export class CourseRegistrationComponent {
  onSubmit(form: NgForm){
    if (form.valid){
      console.log('Dữ liệu khóa học:', form.value);
      alert(JSON.stringify(form.value));

      let infor = "Full Name = " + form.value.fullName + "\n"
        + "Email=" + form.value.email + "\n"
        + "Phone=" + form.value.phone + "\n"
        + "Course=" + form.value.course + "\n"
        + "Shift=" + form.value.shift + "\n"
        + "Agree=" + form.value.agree;

      alert(infor);
    }
  }
}
