import { Component, OnInit } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';
import { RouterOutlet } from '@angular/router';

interface User {
  firstname: string;
  lastname: string;
  role: string;
  avatar: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [PanelMenuModule, RouterOutlet],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar implements OnInit {
  items!: MenuItem[];

  user: User = {
    firstname: 'Jan',
    lastname: 'Kowalski',
    role: 'Mechanik',
    avatar: 'user1.png',
  };

  ngOnInit() {
    this.items = [
      {
        label: 'Aplikacja',
        separator: true,
      },
      {
        label: 'Dashboard',
        icon: 'pi pi-home',
        routerLink: ['/app/dashboard'],
      },
      {
        label: 'Kalendarz',
        icon: 'pi pi-calendar',
        routerLink: ['/app/kalendarz'],
      },
      {
        label: 'Magazyn',
        icon: 'pi pi-store',
        routerLink: '/app/magazyn',
        items: [
          {
            label: 'Części',
            icon: 'pi pi-cog',
            routerLink: ['/app/magazyn/czesci'],
          },
          {
            label: 'Narzędzia',
            icon: 'pi pi-wrench',
            routerLink: ['/app/magazyn/narzedzia'],
          },
          {
            label: 'Produkty',
            icon: 'pi pi-box',
            routerLink: ['/app/magazyn/produkty'],
          },
        ],
      },
      {
        label: 'Kosztorysy',
        icon: 'pi pi-table',
        routerLink: ['/app/kosztorysy'],
      },

      {
        label: 'Ustawienia',
        separator: true,
      },
      {
        label: 'Ogólne',
        icon: 'pi pi-cog',
        routerLink: ['/app/ustawienia'],
      },
      {
        label: 'Powiadomienia',
        icon: 'pi pi-cog',
      },
      {
        label: 'Pomoc i wsparcie',
        icon: 'pi pi-cog',
        routerLink: ['/app/pomoc'],
      },
    ];
  }

  toggleDarkMode() {
    document.documentElement.classList.toggle('dark-app');
  }
}
