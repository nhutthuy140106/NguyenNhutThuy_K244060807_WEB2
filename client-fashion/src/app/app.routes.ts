import { Routes } from '@angular/router';
import { Home } from './pages/home';
import { FashionDetail } from './pages/fashion-detail';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'fashion/:id', component: FashionDetail },
  { path: '**', redirectTo: '' }
];
