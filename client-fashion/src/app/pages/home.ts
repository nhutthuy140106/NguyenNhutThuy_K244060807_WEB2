import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Fashion } from '../models/fashion';
import { FashionService } from '../services/fashion.service';

interface Group { style: string; items: Fashion[]; }

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <main class="wrap">
      <section class="search">
        <input type="search" placeholder="Nhập Style để tìm (VD: street)..."
               [value]="query()" (input)="query.set($any($event.target).value)" />
        <select [value]="query()" (change)="query.set($any($event.target).value)">
          <option value="">Tất cả Style</option>
          @for (s of styles(); track s) { <option [value]="s">{{ s }}</option> }
        </select>
        @if (query()) { <button class="btn btn-light" (click)="query.set('')">Xóa lọc</button> }
      </section>

      @if (error()) { <p class="error">{{ error() }}</p> }
      @if (loading()) { <p class="info">Đang tải...</p> }

      @for (g of groups(); track g.style) {
        <section class="group">
          <h2>{{ g.style }}</h2>
          <div class="grid">
            @for (f of g.items; track f._id) {
              <a class="card" [routerLink]="['/fashion', f._id]">
                <div class="photo">
                  @if (f.fashion_image) { <img [src]="f.fashion_image" [alt]="f.fashion_subject" loading="lazy" /> }
                  @else { <span>No image</span> }
                </div>
                <h3>{{ f.fashion_subject }}</h3>
              </a>
            }
          </div>
        </section>
      } @empty {
        @if (!loading() && !error()) { <p class="info">Không có Fashion nào thuộc Style “{{ query() }}”.</p> }
      }
    </main>
  `,
  styles: `
    .search { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; padding: 28px 0 8px; }
    .search input, .search select { height: 42px; padding: 0 14px; border: 1px solid var(--line); font: inherit; background: #fff; min-width: 240px; }
    .search input:focus, .search select:focus { outline: 2px solid #11111122; border-color: #111; }
    .group { margin-top: 44px; }
    .group h2 { text-align: center; font-size: 14px; letter-spacing: .3em; font-weight: 800; margin: 0 0 24px; position: relative; text-transform: uppercase; }
    .group h2::after { content: ''; display: block; width: 36px; height: 2px; background: var(--accent); margin: 10px auto 0; }
    .grid { display: flex; flex-wrap: wrap; justify-content: center; gap: 28px 22px; }
    .card { text-decoration: none; display: block; flex: 0 1 270px; max-width: 100%; }
    .photo { aspect-ratio: 3 / 4; overflow: hidden; background: #f1f1f1; display: grid; place-items: center; color: var(--muted); font-size: 12px; }
    .photo img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .5s ease; }
    .card:hover img { transform: scale(1.05); }
    .card h3 { font-family: var(--serif); font-size: 17px; line-height: 1.35; margin: 12px 0 0; font-weight: 700; }
    .card:hover h3 { color: var(--accent); }
    .info, .error { text-align: center; color: var(--muted); padding: 40px 0; }
    .error { color: var(--accent); }
  `
})
export class Home implements OnInit {
  private service = inject(FashionService);

  fashions = signal<Fashion[]>([]);
  styles = signal<string[]>([]);
  query = signal('');
  loading = signal(true);
  error = signal('');

  groups = computed<Group[]>(() => {
    const q = this.query().trim().toLowerCase();
    const map = new Map<string, Fashion[]>();
    for (const f of this.fashions()) {
      if (q && !(f.style ?? '').toLowerCase().includes(q)) continue;
      const key = f.style || 'OTHER';
      map.set(key, [...(map.get(key) ?? []), f]);
    }
    return [...map.entries()].map(([style, items]) => ({ style, items }));
  });

  ngOnInit() {
    this.service.getStyles().subscribe({ next: (s) => this.styles.set(s) });
    this.service.getAll().subscribe({
      next: (data) => { this.fashions.set(data); this.loading.set(false); },
      error: () => {
        this.loading.set(false);
        this.error.set('Không kết nối được server-fashion (http://localhost:4000). Hãy chạy server trước.');
      }
    });
  }
}
