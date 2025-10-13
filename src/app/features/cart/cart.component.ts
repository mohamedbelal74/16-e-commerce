import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TermPipe } from "../../shared/pipes/term-pipe";
import { Cart } from '../../core/interfaces/cart.interface';
import { CartService } from './../../core/services/cart.service';
import { CommonModule } from '@angular/common'; // ✅ لازم عشان *ngIf, *ngFor

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, TermPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);

  cartDetails: Cart | null = null;
  loading: boolean = true;
  error: string | null = null;

  ngOnInit(): void {
    this.getLogedUserData();
  }

  getLogedUserData(): void {
    this.loading = true;
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartDetails = res.data;
        this.cartService.setCartCount(res.numOfCartItems);
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.error = "Failed to load cart";
        this.loading = false;
      }
    });
  }

  removeItem(id: string): void {
    this.cartService.removeSpecificCartItem(id).subscribe({
      next: (res) => {
        this.cartDetails = res.data;
        this.cartService.setCartCount(res.numOfCartItems);
      },
      error: (err) => console.log(err)
    });
  }

  updateCartCount(id: string, count: number): void {
    if (count <= 0) return; // ✅ علشان مايبقاش بالسالب
    this.cartService.updateCartCount(id, count).subscribe({
      next: (res) => {
        this.cartDetails = res.data;
        this.cartService.setCartCount(res.numOfCartItems);
      },
      error: (err) => console.log(err)
    });
  }

  // ✅ trackBy function
  trackByProductId(index: number, item: any): string {
    return item.product._id;
  }
}
