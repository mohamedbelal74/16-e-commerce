import { Component, inject, Input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  loading: boolean = true;
  @Input({ required: true }) isLogin!: boolean;
  private readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);

  count: number = 0;

  ngOnInit(): void {
    this.cartService.cartCount$.subscribe(c => {
      this.count = c;
    });
  }

  sigOut(): void {
    this.authService.logOut();
  }
}
