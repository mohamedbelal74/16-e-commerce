import { AllordersComponent } from './../allorders/allorders.component';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly cartService = inject(CartService);
  private readonly router = inject(Router);

  checkOutForm!: FormGroup;
  id: string | null = null;
  successMessage: string = '';
  errorMessage: string = '';

  ngOnInit(): void {
    this.initForm();
    this.getCartId();
  }

  
  getCartId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (urlParams) => {
        this.id = urlParams.get('id');
        console.log('Cart ID:', this.id);
      }
    });
  }

 
  initForm(): void {
    this.checkOutForm = this.fb.group({
      shippingAddress: this.fb.group({
        details: [null, [Validators.required, Validators.minLength(5)]],
        phone: [null, [Validators.required, Validators.pattern(/^01[0-2,5]{1}[0-9]{8}$/)]],
        city: [null, [Validators.required]]
      })
    });
  }


  get detailsControl() {
    return this.checkOutForm.get('shippingAddress.details');
  }
  get phoneControl() {
    return this.checkOutForm.get('shippingAddress.phone');
  }
  get cityControl() {
    return this.checkOutForm.get('shippingAddress.city');
  }

 
  submitVisa(): void {
    if (this.checkOutForm.valid && this.id) {
      this.cartService.checkOutSession(this.id, this.checkOutForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.status === 'success' && res.session?.url) {
            window.open(res.session.url, '_self');
          }
          this.successMessage = 'Visa checkout completed successfully ✅';
        },
        error: (err) => {
          console.log(err);
          this.errorMessage = 'Visa checkout failed ❌';
        }
      });
    } else {
      this.checkOutForm.markAllAsTouched();
      this.errorMessage = 'Please fill out all required fields ❌';
    }
  }


  submitCash(): void {
    if (this.checkOutForm.valid && this.id) {
      this.cartService.checkOutSessionCash(this.id, this.checkOutForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.status === 'success') {
            this.successMessage = 'Cash checkout completed successfully ✅';
            this.router.navigate(['/allorders'])
          }
        },
        error: (err) => {
          console.log(err);
          this.errorMessage = 'Cash checkout failed ❌';
        }
      });
    } else {
      this.checkOutForm.markAllAsTouched();
      this.errorMessage = 'Please fill out all required fields ❌';
    }
  }
}
