import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs/internal/operators/catchError';
import { retry } from 'rxjs/internal/operators/retry';
import { Product } from '../classes/IProduct';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class ProductHttpHandleErrorService {
    private _url: string = 'datasets/products.js';

    constructor(private _http: HttpClient) {}

    getProductList(): Observable<Product[]> {
        return this._http.get<Product[]>(this._url)
        .pipe(
            retry(3),
            catchError(this.handleError)
        );
    }

    handleError(error: HttpErrorResponse) {
        return throwError(() => new Error(error.message));
    }
}
