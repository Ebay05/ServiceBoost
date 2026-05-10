import { Component } from '@angular/core';
import { MeterGroup } from 'primeng/metergroup';

interface Orders {
  accepted: number;
  ongoing: number;
  delayed: number;
}

@Component({
  selector: 'app-dashboard',
  imports: [MeterGroup],
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

  get meterValues() {
    if (!this.orders) return [];

    const { accepted, ongoing, delayed } = this.orders;
    const total = accepted + ongoing + delayed;

    if (total === 0) return [];

    return [
      { label: `Przyjęte (${accepted})`, value: (accepted / total) * 100, color: 'text-green' },
      { label: `W realizacji (${ongoing})`, value: (ongoing / total) * 100, color: 'text-orange' },
      { label: `Opóźnione (${delayed})`, value: (delayed / total) * 100, color: 'text-red' },
    ];
  }
}
