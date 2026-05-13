import { Routes } from '@angular/router';
import { Sidebar } from './shared/components/sidebar/sidebar';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/landing/landing').then((m) => m.Landing),
  },

  {
    path: 'logowanie',
    loadComponent: () => import('./features/login/login').then((m) => m.Login),
  },

  {
    path: 'dostep',
    loadComponent: () => import('./features/access/access').then((m) => m.Access),
  },

  {
    path: 'odzyskiwanie-hasla',
    loadComponent: () =>
      import('./features/change-password/change-password').then((m) => m.ChangePassword),
  },

  {
    path: 'app',
    component: Sidebar,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'zlecenia',
        loadComponent: () => import('./features/orders/list/list').then((m) => m.List),
      },
      {
        path: 'zlecenia/new',
        loadComponent: () => import('./features/orders/form/form').then((m) => m.Form),
      },
      {
        path: 'zlecenia/:id',
        loadComponent: () => import('./features/orders/details/details').then((m) => m.Details),
      },
      {
        path: 'kalendarz',
        loadComponent: () => import('./features/calendar/calendar').then((m) => m.Calendar),
      },
      {
        path: 'magazyn',
        loadComponent: () => import('./features/stock/list/list').then((m) => m.List),
      },
      {
        path: 'magazyn/czesci',
        loadComponent: () => import('./features/stock/parts/parts').then((m) => m.Parts),
      },
      {
        path: 'magazyn/narzedzia',
        loadComponent: () => import('./features/stock/tools/tools').then((m) => m.Tools),
      },
      {
        path: 'magazyn/produkty',
        loadComponent: () => import('./features/stock/products/products').then((m) => m.Products),
      },
      {
        path: 'kosztorysy',
        loadComponent: () => import('./features/estimates/list/list').then((m) => m.List),
      },
      {
        path: 'kosztorysy/:id',
        loadComponent: () => import('./features/estimates/details/details').then((m) => m.Details),
      },
      {
        path: 'ustawienia',
        loadComponent: () => import('./features/settings/settings').then((m) => m.Settings),
      },
    ],
  },

  {
    path: 'login',
    loadComponent: () => import('./features/login/login').then((m) => m.Login),
  },

  {
    path: '**',
    loadComponent: () => import('./features/landing/landing').then((m) => m.Landing),
  },
];
