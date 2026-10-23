import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  template: `
    <header class="masthead">
      <a routerLink="/" class="logo">FASHION</a>
      <p>Street style · Trends · Celebrity</p>
    </header>
    <router-outlet />
    <footer class="foot">© 2026 Fashion · Nguyễn Nhựt Thụy · K244060807</footer>
  `,
  styles: `
    .masthead { text-align: center; padding: 34px 20px 22px; border-bottom: 1px solid var(--line); }
    .logo { font-family: var(--serif); font-size: 44px; letter-spacing: .32em; text-decoration: none; font-weight: 700; padding-left: .32em; }
    .masthead p { margin: 6px 0 0; color: var(--muted); font-size: 12px; letter-spacing: .24em; text-transform: uppercase; }
    .foot { text-align: center; color: var(--muted); font-size: 12px; padding: 36px 20px; border-top: 1px solid var(--line); margin-top: 56px; }
  `
})
export class App {}
