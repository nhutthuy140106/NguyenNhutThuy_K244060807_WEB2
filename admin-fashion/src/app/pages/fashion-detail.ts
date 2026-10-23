import { DatePipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Fashion } from '../models/fashion';
import { FashionService } from '../services/fashion.service';

@Component({
  selector: 'app-fashion-detail',
  imports: [RouterLink, DatePipe],
  template: `
    <main class="container narrow">
      <div class="bar">
        <a class="btn" routerLink="/fashions">← Danh sách</a>
        @if (fashion(); as f) { <a class="btn btn-primary" [routerLink]="['/fashions', f._id, 'edit']">Sửa bài viết</a> }
      </div>

      @if (error()) { <p class="alert">{{ error() }}</p> }

      @if (fashion(); as f) {
        <article class="card">
          @if (f.fashion_image) { <img class="cover" [src]="f.fashion_image" [alt]="f.fashion_subject" /> }
          <div class="body">
            <span class="badge">{{ f.style }}</span>
            <h1>{{ f.fashion_subject }}</h1>
            <p class="muted">Ngày tạo: {{ f.createdAt | date: 'dd/MM/yyyy HH:mm' }}</p>
            <div class="content" [innerHTML]="f.fashion_detail"></div>
          </div>
        </article>
      }
    </main>
  `,
  styles: `
    .narrow { max-width: 820px; }
    .bar { display: flex; justify-content: space-between; margin-bottom: 18px; }
    .cover { width: 100%; max-height: 460px; object-fit: cover; display: block; border-radius: var(--radius) var(--radius) 0 0; }
    .body { padding: 28px 32px 36px; }
    .body h1 { margin: 12px 0 6px; font-size: 30px; }
    .content { margin-top: 18px; font-size: 16px; line-height: 1.75; }
    .content img { max-width: 100%; height: auto; border-radius: 8px; }
    .alert { background: var(--accent-soft); color: var(--accent); padding: 10px 14px; border-radius: 10px; }
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
