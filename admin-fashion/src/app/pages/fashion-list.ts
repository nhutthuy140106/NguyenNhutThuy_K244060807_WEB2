import { DatePipe } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Fashion } from '../models/fashion';
import { FashionService } from '../services/fashion.service';

@Component({
  selector: 'app-fashion-list',
  imports: [RouterLink, DatePipe],
  template: `
    <main class="container">
      <div class="head">
        <div>
          <h1>Quản lý Fashion</h1>
          <p class="muted">{{ filtered().length }} / {{ fashions().length }} bài viết, mới nhất ở trên cùng</p>
        </div>
        <a class="btn btn-primary" routerLink="/fashions/new">＋ Thêm mới</a>
      </div>

      <div class="tools">
        <input class="search" type="search" placeholder="Tìm theo tiêu đề hoặc style..."
               [value]="keyword()" (input)="keyword.set($any($event.target).value)" />
      </div>

      @if (error()) { <p class="alert">{{ error() }}</p> }

      <div class="card table-wrap">
        <table>
          <thead>
            <tr>
              <th class="c-img">Ảnh</th>
              <th>Tiêu đề</th>
              <th class="c-style">Style</th>
              <th class="c-date">Ngày tạo</th>
              <th class="c-act">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            @for (f of filtered(); track f._id) {
              <tr>
                <td>
                  @if (f.fashion_image) { <img class="thumb" [src]="f.fashion_image" [alt]="f.fashion_subject" /> }
                  @else { <div class="thumb empty">No image</div> }
                </td>
                <td>
                  <a class="title" [routerLink]="['/fashions', f._id]">{{ f.fashion_subject }}</a>
                  <div class="snippet muted">{{ plain(f.fashion_detail) }}</div>
                </td>
                <td><span class="badge">{{ f.style }}</span></td>
                <td class="muted nowrap">{{ f.createdAt | date: 'dd/MM/yyyy' }}</td>
                <td>
                  <div class="actions">
                    <a class="btn btn-sm" [routerLink]="['/fashions', f._id]">Xem</a>
                    <a class="btn btn-sm" [routerLink]="['/fashions', f._id, 'edit']">Sửa</a>
                    <button class="btn btn-sm btn-danger" (click)="askDelete(f)">Xóa</button>
                  </div>
                </td>
              </tr>
            } @empty {
              <tr><td colspan="5" class="none">{{ loading() ? 'Đang tải dữ liệu...' : 'Không có Fashion nào.' }}</td></tr>
            }
          </tbody>
        </table>
      </div>
    </main>

    @if (toDelete(); as d) {
      <div class="overlay" (click)="toDelete.set(null)">
        <div class="dialog card" (click)="$event.stopPropagation()">
          <h2>Xác nhận xóa</h2>
          <p>Bạn có chắc muốn xóa <b>“{{ d.fashion_subject }}”</b>?<br /><span class="muted">Hành động này không thể hoàn tác.</span></p>
          <div class="dialog-act">
            <button class="btn" (click)="toDelete.set(null)">Hủy</button>
            <button class="btn btn-danger-solid" [disabled]="deleting()" (click)="confirmDelete()">
              {{ deleting() ? 'Đang xóa...' : 'Xóa' }}
            </button>
          </div>
        </div>
      </div>
    }
  `,
  styles: `
    .head { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; margin-bottom: 18px; flex-wrap: wrap; }
    .head p { margin: 4px 0 0; }
    .tools { margin-bottom: 14px; }
    .search { width: 100%; max-width: 360px; padding: 10px 14px; border: 1px solid var(--line); border-radius: 10px; font: inherit; background: #fff; }
    .search:focus { outline: 2px solid #1b1b1f22; border-color: #b9b3a6; }
    .table-wrap { overflow-x: auto; }
    table { width: 100%; border-collapse: collapse; min-width: 760px; }
    th { text-align: left; font-size: 12px; text-transform: uppercase; letter-spacing: .06em; color: var(--muted); padding: 14px 16px; border-bottom: 1px solid var(--line); background: #faf9f7; }
    td { padding: 14px 16px; border-bottom: 1px solid var(--line); vertical-align: middle; }
    tbody tr:last-child td { border-bottom: 0; }
    tbody tr:hover { background: #fcfbf9; }
    .c-img { width: 90px; } .c-style { width: 160px; } .c-date { width: 120px; } .c-act { width: 220px; }
    .thumb { width: 64px; height: 80px; object-fit: cover; border-radius: 8px; display: block; background: #eee; }
    .thumb.empty { display: grid; place-items: center; font-size: 10px; color: var(--muted); }
    .title { font-weight: 700; color: var(--ink); text-decoration: none; }
    .title:hover { color: var(--accent); }
    .snippet { font-size: 13px; margin-top: 2px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; max-width: 460px; }
    .nowrap { white-space: nowrap; }
    .actions { display: flex; gap: 6px; }
    .none { text-align: center; padding: 48px 16px; color: var(--muted); }
    .alert { background: var(--accent-soft); color: var(--accent); padding: 10px 14px; border-radius: 10px; }
    .overlay { position: fixed; inset: 0; background: rgba(15, 15, 20, .45); display: grid; place-items: center; z-index: 50; padding: 16px; }
    .dialog { width: 100%; max-width: 420px; padding: 24px; }
    .dialog h2 { margin: 0 0 8px; font-size: 20px; }
    .dialog p { margin: 0 0 20px; }
    .dialog-act { display: flex; justify-content: flex-end; gap: 8px; }
  `
})
export class FashionList implements OnInit {
  private service = inject(FashionService);

  fashions = signal<Fashion[]>([]);
  keyword = signal('');
  loading = signal(true);
  error = signal('');
  toDelete = signal<Fashion | null>(null);
  deleting = signal(false);

  filtered = computed(() => {
    const k = this.keyword().trim().toLowerCase();
    if (!k) return this.fashions();
    return this.fashions().filter(
      (f) => f.fashion_subject?.toLowerCase().includes(k) || f.style?.toLowerCase().includes(k)
    );
  });

  ngOnInit() {
    this.load();
  }

  load() {
    this.service.getAll().subscribe({
      next: (data) => { this.fashions.set(data); this.loading.set(false); },
      error: () => {
        this.loading.set(false);
        this.error.set('Không kết nối được server-fashion (http://localhost:4000). Hãy chạy server trước.');
      }
    });
  }

  plain(html: string): string {
    return (html || '').replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
  }

  askDelete(f: Fashion) {
    this.toDelete.set(f);
  }

  confirmDelete() {
    const f = this.toDelete();
    if (!f?._id) return;
    this.deleting.set(true);
    this.service.delete(f._id).subscribe({
      next: () => {
        this.fashions.update((list) => list.filter((x) => x._id !== f._id));
        this.toDelete.set(null);
        this.deleting.set(false);
      },
      error: () => {
        this.deleting.set(false);
        this.error.set('Xóa thất bại, vui lòng thử lại.');
        this.toDelete.set(null);
      }
    });
  }
}
