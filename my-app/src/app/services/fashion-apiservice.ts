import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { Fashion } from '../classes/Fashion';

@Injectable({
  providedIn: 'root',
})
export class FashionAPIService {
    headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8")
    requestOptions:Object={
        headers:this.headers,
        responseType:"text"
      }
    constructor(private _http: HttpClient) { }  
    getFashions():Observable<any>
    {      
      return this._http.get<any>("/fashions",this.requestOptions).pipe(
          map(res=>JSON.parse(res) as Array<Fashion>),
          retry(3),
          catchError(this.handleError))
    }
    handleError(error:HttpErrorResponse){
      return throwError(()=>new Error(error.message))
    }
    getFashion(id:string):Observable<any>
    {
      return this._http.get<any>("/fashions/"+id,this.requestOptions).pipe(
          map(res=>JSON.parse(res) as Fashion),
          retry(3),
          catchError(this.handleError))
    }
    getFashionByIdF(idf:number):Observable<any>
    {
         return this._http.get<any>("/fashions/idf/"+idf,this.requestOptions).pipe(
            map(res=>JSON.parse(res) as Fashion),
            retry(3),
            catchError(this.handleError))
    }

    postFashion(aFashion:any):Observable<any>
    {
      const { _id, IdF, ...body } = aFashion   // _id do MongoDB tự tạo
      let jsonString=JSON.stringify(body)
      const postOptions:Object={
        headers:new HttpHeaders().set("Content-Type","application/json;charset=utf-8"),
        responseType:"text"
      }
      return this._http.post<any>("/fashions",jsonString,postOptions).pipe(
          map(res=>JSON.parse(res) as Fashion),
          retry(3),
          catchError(this.handleError))
    }
        putFashion(aFashion:any):Observable<any>
    {
      let jsonString=JSON.stringify(aFashion)
      const putOptions:Object={
        headers:new HttpHeaders().set("Content-Type","application/json;charset=utf-8"),
        responseType:"text"
      }
      return this._http.put<any>("/fashions",jsonString,putOptions).pipe(
          map(res=>JSON.parse(res) as Fashion),
          retry(3),
          catchError(this.handleError))
    }
    deleteFashion(fashionId:string):Observable<any>
    {
      return this._http.delete<any>("/fashions/"+fashionId,this.requestOptions).pipe(
          map(res=>JSON.parse(res) as Fashion),
          retry(3),
          catchError(this.handleError))
    }


}



