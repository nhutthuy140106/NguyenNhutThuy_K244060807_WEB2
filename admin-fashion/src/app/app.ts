import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <header class="top">
      <div class="top-inner">
        <a class="brand" routerLink="/fashions">FASHION<span>ADMIN</span></a>
        <nav>
          <a routerLink="/fashions" routerLinkActive="on" [routerLinkActiveOptions]="{ exact: true }">Danh sách</a>
          <a routerLink="/fashions/new" routerLinkActive="on">Thêm mới</a>
        </nav>
      </div>
    </header>
    <router-outlet />
  `,
  styles: `
    .top { background: #111114; position: sticky; top: 0; z-index: 10; }
    .top-inner { max-width: 1120px; margin: 0 auto; padding: 0 20px; height: 58px;
      display: flex; align-items: center; justify-content: space-between; }
    .brand { color: #fff; text-decoration: none; font-weight: 800; letter-spacing: .14em; font-size: 15px; }
    .brand span { color: #e5484d; margin-left: 6px; font-weight: 600; }
    nav { display: flex; gap: 6px; }
    nav a { color: #b9b9c2; text-decoration: none; padding: 7px 14px; border-radius: 8px; font-size: 14px; font-weight: 600; }
    nav a:hover { color: #fff; background: #26262c; }
    nav a.on { color: #fff; background: #2e2e36; }
  `
})
export class App {}
