import { Component } from '@angular/core';
import { Fashion } from '../classes/Fashion';
import { FashionAPIService } from '../services/fashion-apiservice';

// Fashion + điểm Jaccard
interface FashionScore { fashion: Fashion; score: number; }

@Component({
  selector: 'app-fashion-search-component',
  standalone: false,
  templateUrl: './fashion-search-component.html',
  styleUrl: './fashion-search-component.css',
})
export class FashionSearchComponent {
  allFashions: Fashion[] = [];
  results: FashionScore[] = [];
  keyword = '';
  field = 'fashion_subject';   // hoặc 'fashion_detail'
  limit = 5;
  errMessage = '';

  constructor(private _service: FashionAPIService) {
    this._service.getFashions().subscribe({
      next: (data) => { this.allFashions = data; },
      error: (err) => { this.errMessage = err; }
    });
  }

  // Tách chuỗi thành tập từ (chữ thường, bỏ dấu câu)
  tokenize(text: string): Set<string> {
    const words = (text || '').toLowerCase().split(/[^\p{L}\p{N}]+/u).filter(w => w);
    return new Set(words);
  }

  jaccard(a: string, b: string): number {
    const A = this.tokenize(a);
    const B = this.tokenize(b);
    if (A.size === 0 && B.size === 0) return 0;
    let inter = 0;
    A.forEach(w => { if (B.has(w)) inter++; });
    const union = A.size + B.size - inter;
    return inter / union;
  }

  search() {
    this.results = this.allFashions
      .map(f => ({
        fashion: Object.assign(new Fashion(), f),   // để dùng được getBase64String()
        score: this.jaccard(this.keyword, (f as any)[this.field])
      }))
      .sort((x, y) => y.score - x.score)   // giảm dần
      .slice(0, this.limit);               // lấy N dòng đầu
  }

  rowClass(score: number): string {
  if (score >= 0.75) return 'high';     // vàng + chữ đỏ
  if (score >= 0.5) return 'medium';    // hồng + chữ xanh
  return 'low';                         // đỏ + chữ trắng
}


}
