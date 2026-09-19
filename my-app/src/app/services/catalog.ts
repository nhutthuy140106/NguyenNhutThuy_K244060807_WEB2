import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  datas = [
    {
      Cateid: 'cate1',
      CateName: 'nuoc ngot',
      Products: [
        {
          ProductId: 'p1',
          ProductName: 'Coca',
          Price: 100,
          Image: 'assets/Coca.jpg'
        },
        {
          ProductId: 'p2',
          ProductName: 'Pepsi',
          Price: 300,
          Image: 'assets/Pepsi.jpg'
        },
        {
          ProductId: 'p3',
          ProductName: 'Sting',
          Price: 200,
          Image: 'assets/Sting.jpg'
        }
      ]
    },
    {
      Cateid: 'cate2',
      CateName: 'Bia',
      Products: [
        {
          ProductId: 'p4',
          ProductName: 'Heineken',
          Price: 500,
          Image: 'assets/heineken.jpg'
        },
        {
          ProductId: 'p5',
          ProductName: '333',
          Price: 400,
          Image: 'assets/333.jpg'
        },
        {
          ProductId: 'p6',
          ProductName: 'Sai Gon',
          Price: 600,
          Image: 'assets/Saigon.jpg'
        }
      ]
    }
  ];

  constructor() {}

  getCategories() {
    return this.datas;
  }
}