import { PorductsService } from './../../core/services/porducts.service';
import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../core/interfaces/product.interface';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { TermPipe } from '../../shared/pipes/term-pipe';
import { SearchPipe } from '../../shared/pipes/search-pipe';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Cart } from '../../core/interfaces/cart.interface';
import { CartService } from './../../core/services/cart.service';
import { CommonModule } from '@angular/common';

@Component({ 
  selector: 'app-products',
  standalone: true,
  imports: [CarouselModule, RouterLink, NgxPaginationModule, TermPipe, SearchPipe, FormsModule,CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  loading: boolean = true;
  productsList: Product[] = [];
  text: string = '';
  pageSize!: number;
  p!: number;
  total!: number;

  cartDetails: Cart = {} as Cart;

  private readonly cartService = inject(CartService);
  private readonly toastrServicef = inject(ToastrService);

  constructor(private productsService: PorductsService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(pageNumber: number = 1): void {
    this.loading = true; 
    this.productsService.getProducts(pageNumber).subscribe({
      next: (res) => {
        this.productsList = res.data;
        this.pageSize = res.metadata.limit;
        this.p = res.metadata.currentPage;
        this.total = res.results;  
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      }
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
