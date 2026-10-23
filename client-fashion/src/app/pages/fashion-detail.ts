import { DatePipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Fashion } from '../models/fashion';
import { FashionService } from '../services/fashion.service';

@Component({
  selector: 'app-fashion-detail',
  imports: [RouterLink, DatePipe],
  template: `
    <main class="wrap article">
      <a class="back" routerLink="/">← Tất cả Fashion</a>

      @if (error()) { <p class="error">{{ error() }}</p> }

      @if (fashion(); as f) {
        <p class="kicker">{{ f.style }}</p>
        <h1>{{ f.fashion_subject }}</h1>
        <p class="date">{{ f.createdAt | date: 'dd/MM/yyyy' }}</p>
        <div class="content" [innerHTML]="f.fashion_detail"></div>
        @if (f.fashion_image) { <img class="hero" [src]="f.fashion_image" [alt]="f.fashion_subject" /> }
      }
    </main>
  `,
  styles: `
    .article { max-width: 780px; padding-top: 28px; }
    .back { font-size: 13px; letter-spacing: .08em; text-transform: uppercase; text-decoration: none; color: var(--muted); }
    .back:hover { color: var(--ink); }
    .kicker { margin: 28px 0 8px; color: var(--accent); font-size: 12px; font-weight: 800; letter-spacing: .26em; text-transform: uppercase; }
    h1 { font-family: var(--serif); font-size: 38px; line-height: 1.2; margin: 0; }
    .date { color: var(--muted); font-size: 13px; margin: 10px 0 24px; }
    .content { font-family: var(--serif); font-size: 18px; line-height: 1.8; color: #2a2a2a; }
    .content :is(img) { max-width: 100%; height: auto; }
    .hero { width: 100%; display: block; margin-top: 28px; }
    .error { color: var(--accent); padding: 40px 0; text-align: center; }
  `
})
export class FashionDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private service = inject(FashionService);

  fashion = signal<Fashion | null>(null);
  error = signal('');

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.service.getById(id).subscribe({
      next: (f) => this.fashion.set(f),
      error: () => this.error.set('Không tìm thấy Fashion này.')
    });
  }
}
