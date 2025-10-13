import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailsProductService } from '../../core/services/details-product.service';
import { Product } from '../../core/interfaces/product.interface';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  standalone: true,
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly detailsProductService = inject(DetailsProductService);
  private readonly cartService = inject(CartService);
  private readonly toastrServicef = inject(ToastrService);

  id: string | null = null;
  detailsProduct: Product = {} as Product;
  selectedImage: string = '';

  ngOnInit(): void {
    this.getProductId();
  }

  getProductId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (urlParams) => {
        this.id = urlParams.get('id');
        if (this.id) {
          this.getDetailsProdctData(this.id);
        }
      }
    });
  }

  getDetailsProdctData(id: string): void {
    this.detailsProductService.getDetailsProduct(id).subscribe({
      next: (res) => {
        this.detailsProduct = res.data;
        this.selectedImage = this.detailsProduct.imageCover;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  changeImage(img: string): void {
    this.selectedImage = img;
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
