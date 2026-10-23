import { Routes } from '@angular/router';
import { FashionList } from './pages/fashion-list';
import { FashionForm } from './pages/fashion-form';
import { FashionDetail } from './pages/fashion-detail';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'fashions' },
  { path: 'fashions', component: FashionList },
  { path: 'fashions/new', component: FashionForm },
  { path: 'fashions/:id/edit', component: FashionForm },
  { path: 'fashions/:id', component: FashionDetail },
  { path: '**', redirectTo: 'fashions' }
];
