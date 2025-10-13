import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IAllOrders } from '../../core/interfaces/IAllOrders.interface';
import { CartService } from './../../core/services/cart.service';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css']
})
export class AllordersComponent implements OnInit {

  allOrders: IAllOrders[] = [];
  expanded: { [key: string]: boolean } = {};
  private readonly cartService = inject(CartService);

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders(): void {
    this.cartService.getAllOrders().subscribe({
      next: (res: any) => {
        // إذا الـ API بيرجع object فيه data أو array مباشر
        this.allOrders = Array.isArray(res) ? res : res.data || [];
        // تأكد من كونها array قبل استخدام reduce
        if (Array.isArray(this.allOrders)) {
          this.expanded = this.allOrders.reduce((acc: any, o: IAllOrders) => {
            acc[o._id] = false;
            return acc;
          }, {});
        } else {
          this.allOrders = [];
        }
        console.log('allOrders:', this.allOrders);
      },
      error: (err) => console.error('Error fetching orders:', err)
    });
  }

  toggle(orderId: string): void {
    this.expanded[orderId] = !this.expanded[orderId];
  }

  trackById(index: number, item: IAllOrders): string {
    return item._id;
  }

  viewOrder(id: string): void {
    console.log('View order:', id);
  }

  downloadInvoice(id: string): void {
    console.log('Download invoice for order:', id);
  }
}
