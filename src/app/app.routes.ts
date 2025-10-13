import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { BlackLayoutComponent } from './core/layouts/black-layout/black-layout.component';
import { authGuard } from './core/guards/auth-guard';
import { isLoggedGuard } from './core/guards/is-logged-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // 🔹 Auth Layout
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [isLoggedGuard],
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./core/auth/login/login.component').then((m) => m.LoginComponent),
        title: 'Login page',
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./core/auth/register/register.component').then((m) => m.RegisterComponent),
        title: 'Register Page',
      },
      {
        path: 'forgot',
        loadComponent: () =>
          import('./core/auth/forgot-password/forgot-password.component').then((m) => m.ForgotPasswordComponent),
        title: 'Forgot Page',
      },
    ],
  },

  // 🔹 Main Layout
  {
    path: '',
    component: BlackLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./features/home/home.component').then((m) => m.HomeComponent),
        title: 'Home Page',
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./features/cart/cart.component').then((m) => m.CartComponent),
        title: 'Cart Page',
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./features/products/products.component').then((m) => m.ProductsComponent),
        title: 'Products Page',
      },
      {
        path: 'brands',
        loadComponent: () =>
          import('./features/brands/brands.component').then((m) => m.BrandsComponent),
        title: 'Brands Page',
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./features/categories/categories.component').then((m) => m.CategoriesComponent),
        title: 'Categories Page',
      },
      {
        path: 'details/:slug/:id',
        loadComponent: () =>
          import('./features/details/details.component').then((m) => m.DetailsComponent),
        title: 'Details Page',
      },
      {
        path: 'details/:id',
        loadComponent: () =>
          import('./features/details/details.component').then((m) => m.DetailsComponent),
        title: 'Details Page',
      },
      {
        path: 'allorders',
        loadComponent: () =>
          import('./features/allorders/allorders.component').then((m) => m.AllordersComponent),
        title: 'All Orders Page',
      },
      {
        path: 'checkout/:id',
        loadComponent: () =>
          import('./features/checkout/checkout.component').then((m) => m.CheckoutComponent),
        title: 'Checkout Page',
      },
    ],
  },

  // 🔹 NotFound (برا أي Layout → مش محتاج Login)
  {
    path: '**',
    loadComponent: () =>
      import('./features/notfound/notfound.component').then((m) => m.NotfoundComponent),
    title: 'Not Found Page',
  },
];
