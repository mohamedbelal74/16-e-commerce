import { RouterLink } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Product } from '../../../core/interfaces/product.interface';
import { PorductsService } from '../../../core/services/porducts.service';
import { TermPipe } from '../../pipes/term-pipe';
import { CartService } from '../../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-popular-products',
  imports: [CarouselModule, RouterLink, TermPipe],
  templateUrl: './popular-products.component.html',
  styleUrl: './popular-products.component.css'
})
export class PopularProductsComponent implements OnInit {
  productsList: Product[] = [];

  customMainSlider: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    items: 1,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true
  };

  constructor(private productsService: PorductsService) {}

  private readonly cartService = inject(CartService);
  private readonly toastrServicef = inject(ToastrService);

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productsService.getProducts().subscribe({
      next: (res) => (this.productsList = res.data),
      error: (err) => console.error(err)
    });
  }

  addProducttItemCart(id: string): void {
    this.cartService.addProdctToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === "success") {
      
          this.cartService.setCartCount(res.numOfCartItems);
          this.toastrServicef.success(res.message, 'Freshcart');
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
