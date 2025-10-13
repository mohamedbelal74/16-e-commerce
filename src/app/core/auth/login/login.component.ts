import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoading: boolean = false;
  errorMsg: string = '';
  showToast: boolean = false;

  flag: boolean = false; // هنا اضفنا المتغير
  private readonly cookieService = inject(CookieService);

  constructor(private auth: AuthService, private router: Router) {}

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/)])
  });

  submit() {
    if (this.loginForm.valid) {
      this.isLoading = true;

      this.auth.login(this.loginForm.value).subscribe({
        next: (res: any) => { // حددنا النوع مؤقتًا
          this.isLoading = false;

          this.cookieService.set('token', res.token);
          if (res.user && res.user._id) {
            this.cookieService.set('userId', res.user._id);
          }

          this.router.navigate(['/home']);
        },
        error: (err: any) => { // حددنا النوع مؤقتًا
          this.isLoading = false;
          this.errorMsg = err.error?.message || 'حدث خطأ ما';
          this.showToast = true;
          setTimeout(() => (this.showToast = false), 8000);
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
