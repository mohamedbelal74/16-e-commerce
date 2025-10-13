
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';  
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], 
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  isLoading: boolean = false;
  errorMsg: string = '';
  showToast: boolean = false;  

  flag:boolean=true;
  
  sign:boolean=true;

  constructor(private auth: AuthService,private router:Router) {}

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      // Validators.pattern(/^[\u0600-\u06FFa-zA-Z\s]+$/)
    ]),
    email: new FormControl(null, [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6)
    ]),
    rePassword: new FormControl(null),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^01[0-2,5]{1}[0-9]{8}$/)
    ]),
  }, this.confirmPassword);

  submit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      this.isLoading = true;

      this.auth.register(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.isLoading = false;
          this.router.navigate(['/login'])
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
          this.errorMsg = err.error.message || 'حدث خطأ ما'; 
          this.showToast = true; 

          
          setTimeout(() => {
            this.showToast = false;
          }, 8000);
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  confirmPassword(form: AbstractControl) {
    let password = form.get('password')?.value;
    let rePassword = form.get('rePassword')?.value;
    if (password === rePassword) {
      return null;
    } else {
      return { misMatch: true };
    }
  }
}


