import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Editor, NgxEditorComponent, NgxEditorMenuComponent, Toolbar } from 'ngx-editor';
import { FashionService } from '../services/fashion.service';

@Component({
  selector: 'app-fashion-form',
  imports: [FormsModule, RouterLink, NgxEditorComponent, NgxEditorMenuComponent],
  template: `
    <main class="container narrow">
      <div class="bar">
        <a class="btn" routerLink="/fashions">← Danh sách</a>
      </div>

      <div class="card form">
        <h1>{{ id ? 'Chỉnh sửa Fashion' : 'Thêm mới Fashion' }}</h1>

        @if (error()) { <p class="alert">{{ error() }}</p> }

        <div class="row">
          <div class="field">
            <label for="style">Style</label>
            <input id="style" list="styles" placeholder="VD: STREET STYLE" [ngModel]="style()" (ngModelChange)="style.set($event)" />
            <datalist id="styles">
              @for (s of styles(); track s) { <option [value]="s"></option> }
            </datalist>
            @if (submitted() && !style().trim()) { <small class="err">Vui lòng nhập Style</small> }
          </div>
          <div class="field grow">
            <label for="title">Tiêu đề</label>
            <input id="title" placeholder="Tiêu đề bài fashion" [ngModel]="title()" (ngModelChange)="title.set($event)" />
            @if (submitted() && !title().trim()) { <small class="err">Vui lòng nhập tiêu đề</small> }
          </div>
        </div>

        <div class="field">
          <label>Ảnh thumbnail</label>
          <div class="upload">
            @if (image()) { <img class="preview" [src]="image()" alt="preview" /> }
            @else { <div class="preview empty">Chưa có ảnh</div> }
            <div>
              <input #file type="file" accept="image/*" hidden (change)="onFile($event)" />
              <button type="button" class="btn" (click)="file.click()">Chọn ảnh...</button>
              @if (image()) { <button type="button" class="btn btn-danger" (click)="image.set('')">Bỏ ảnh</button> }
              <p class="muted hint">Ảnh được tự động thu nhỏ để nhẹ database.</p>
            </div>
          </div>
        </div>

        <div class="field">
          <label>Chi tiết (WYSIWYG)</label>
          <div class="editor">
            <ngx-editor-menu [editor]="editor" [toolbar]="toolbar"></ngx-editor-menu>
            <ngx-editor [editor]="editor" [ngModel]="detail()" (ngModelChange)="detail.set($event)"
                        [placeholder]="'Nhập nội dung chi tiết...'"></ngx-editor>
          </div>
        </div>

        <div class="foot">
          <a class="btn" routerLink="/fashions">Hủy</a>
          <button class="btn btn-primary" [disabled]="saving()" (click)="save()">
            {{ saving() ? 'Đang lưu...' : 'Lưu' }}
          </button>
        </div>
      </div>
    </main>
  `,
  styles: `
    .narrow { max-width: 860px; }
    .bar { margin-bottom: 18px; }
    .form { padding: 28px 32px 32px; }
    .form h1 { margin-bottom: 22px; }
    .row { display: flex; gap: 16px; flex-wrap: wrap; }
    .grow { flex: 1 1 320px; }
    .field { margin-bottom: 20px; min-width: 200px; }
    label { display: block; font-size: 13px; font-weight: 700; margin-bottom: 6px; }
    input:not([type=file]) { width: 100%; padding: 10px 14px; border: 1px solid var(--line); border-radius: 10px; font: inherit; background: #fff; }
    input:focus { outline: 2px solid #1b1b1f22; border-color: #b9b3a6; }
    .err { color: var(--accent); font-size: 12px; }
    .upload { display: flex; gap: 18px; align-items: center; flex-wrap: wrap; }
    .preview { width: 120px; height: 150px; object-fit: cover; border-radius: 10px; border: 1px solid var(--line); }
    .preview.empty { display: grid; place-items: center; color: var(--muted); font-size: 12px; background: #faf9f7; }
    .hint { font-size: 12px; margin: 8px 0 0; }
    .editor { border: 1px solid var(--line); border-radius: 10px; overflow: hidden; background: #fff; }
    .foot { display: flex; justify-content: flex-end; gap: 10px; margin-top: 8px; }
    .alert { background: var(--accent-soft); color: var(--accent); padding: 10px 14px; border-radius: 10px; }
    :host ::ng-deep .NgxEditor__MenuBar { background: #faf9f7; border-bottom: 1px solid var(--line); }
    :host ::ng-deep .NgxEditor { border: 0; min-height: 240px; }
    :host ::ng-deep .NgxEditor__Content { min-height: 220px; padding: 14px 16px; }
  `
})
export class FashionForm implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(FashionService);

  id = this.route.snapshot.paramMap.get('id');

  style = signal('');
  title = signal('');
  detail = signal('');
  image = signal('');
  styles = signal<string[]>([]);
  saving = signal(false);
  submitted = signal(false);
  error = signal('');

  editor = new Editor();
  toolbar: Toolbar = [
    ['bold', 'italic', 'underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
    ['horizontal_rule', 'format_clear']
  ];

  ngOnInit() {
    this.service.getStyles().subscribe({ next: (s) => this.styles.set(s) });
    if (this.id) {
      this.service.getById(this.id).subscribe({
        next: (f) => {
          this.style.set(f.style ?? '');
          this.title.set(f.fashion_subject ?? '');
          this.detail.set(f.fashion_detail ?? '');
          this.image.set(f.fashion_image ?? '');
        },
        error: () => this.error.set('Không tải được Fashion cần sửa.')
      });
    }
  }

  ngOnDestroy() {
    this.editor.destroy();
  }

  onFile(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.resize(file, 900).then((data) => this.image.set(data)).catch(() => this.error.set('Không đọc được ảnh.'));
  }

  save() {
    this.submitted.set(true);
    if (!this.style().trim() || !this.title().trim()) return;
    this.saving.set(true);
    const body = {
      style: this.style().trim(),
      fashion_subject: this.title().trim(),
      fashion_detail: this.detail(),
      fashion_image: this.image()
    };
    const req = this.id
      ? this.service.update({ ...body, _id: this.id })
      : this.service.create(body);
    req.subscribe({
      next: () => this.router.navigate(['/fashions']),
      error: () => {
        this.saving.set(false);
        this.error.set('Lưu thất bại. Kiểm tra server-fashion (port 4000) đang chạy.');
      }
    });
  }

  private resize(file: File, max: number): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const scale = Math.min(1, max / Math.max(img.width, img.height));
          const canvas = document.createElement('canvas');
          canvas.width = Math.round(img.width * scale);
          canvas.height = Math.round(img.height * scale);
          canvas.getContext('2d')!.drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL('image/jpeg', 0.85));
        };
        img.onerror = reject;
        img.src = reader.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
}
