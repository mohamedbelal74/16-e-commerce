import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService, LoginResponse } from '../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly cookieService = inject(CookieService);
  private readonly router = inject(Router);

  verifyEmail!: FormGroup;
  verifyCode!: FormGroup;
  resetPassword!: FormGroup;

  step: number = 1;

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.verifyEmail = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]]
    });

    this.verifyCode = this.formBuilder.group({
      resetCode: [null, [Validators.required]]
    });

    this.resetPassword = this.formBuilder.group({
      newPassword: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]]
    });
  }

  formStep1(): void {
    if (this.verifyEmail.valid) {
      this.authService.submitVerifyEmail(this.verifyEmail.value).subscribe({
        next: (res) => {
          console.log(res);
          this.step = 2;
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }

  formStep2(): void {
    if (this.verifyCode.valid) {
      this.authService.submitVerifyCode(this.verifyCode.value).subscribe({
        next: (res) => {
          console.log(res);
          this.step = 3;
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }

  formStep3(): void {
    if (this.resetPassword.valid) {
     
      const data = {
        email: this.verifyEmail.get('email')?.value,
        newPassword: this.resetPassword.get('newPassword')?.value
      };

      this.authService.submitResetPassword(data).subscribe({
        next: (res: LoginResponse) => {
          console.log(res);

         
          this.cookieService.set('token', res.token, { path: '/' });
          this.cookieService.set('userId', res.user._id, { path: '/' });

      
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }
}
