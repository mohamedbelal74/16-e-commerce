import { Component, OnInit } from '@angular/core';
import { Category } from '../../core/interfaces/product.interface';
import { CategoriesService } from '../../core/services/categories.service';
import { OwlOptions, CarouselModule } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';   // ✅ ضروري عشان *ngIf و *ngFor

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CommonModule,  // ✅
    CarouselModule
  ],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categoriesList: Category[] = [];
  loading: boolean = true;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    responsive: {
      0: { items: 1 },
      400: { items: 2 },
      740: { items: 4 },
      940: { items: 6 }
    },
    nav: true
  };

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categoriesService.getCategories().subscribe({
      next: (res) => {
        this.categoriesList = res.data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }
    trackByFn(index: number, item: Category): string {
    return item._id; 
  }
}
