import { Component } from '@angular/core';

interface Orders {
  accepted: number;
  ongoing: number;
  delayed: number;
}

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  orders: Orders = {
    accepted: 20,
    ongoing: 2,
    delayed: 3,
  };

  get totalOrders() {
    return this.orders.accepted + this.orders.ongoing + this.orders.delayed;
  }
}
