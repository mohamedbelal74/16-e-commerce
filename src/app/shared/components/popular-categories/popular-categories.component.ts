import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../../core/services/categories.service';
import { OwlOptions, CarouselModule } from 'ngx-owl-carousel-o';
import { Category } from '../../../core/interfaces/product.interface';

@Component({
  selector: 'app-popular-categories',
  imports: [CarouselModule],
  templateUrl: './popular-categories.component.html',
  styleUrl: './popular-categories.component.css'
})
export class PopularCategoriesComponent  implements OnInit {
  categoriesList: Category[] = [];

  
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

  getCategories() {
    this.categoriesService.getCategories().subscribe({
      next: (res) => (this.categoriesList = res.data),
      error: (err) => console.error(err)
    });
  }
}
