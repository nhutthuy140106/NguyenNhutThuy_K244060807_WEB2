import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLogin } from '../classes/UserLogin';

@Component({
  selector: 'app-login-component',
  standalone: false,
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {
  user = new UserLogin();

  constructor(private router: Router) {}

  onLogin(form: NgForm) {
    if (form.invalid || !this.user.username.trim() || !this.user.password.trim()) {
      form.control.markAllAsTouched();
      return;
    }

    localStorage.setItem('isLoggedIn', 'true');
    alert('Đăng nhập thành công!');
    this.router.navigate(['/lazyinfor']);
  }

  onLogout() {
    localStorage.removeItem('isLoggedIn');
    this.user = new UserLogin();
    alert('Bạn đã đăng xuất.');
    this.router.navigate(['/login']);
  }
}