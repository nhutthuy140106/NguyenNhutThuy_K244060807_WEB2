import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-first',
  standalone: false,
  styleUrl: './first.css',
  templateUrl: './first.html',
})
export class First {

  @Input('parentData') public data: any;

  @Output() public childEvent = new EventEmitter();

  constructor() { }
  ngOnInit(): void { }
  sendData(): void {
    let beerInfo = {
      name: "Heniken",
      price: 19000
    };

    this.childEvent.emit(beerInfo);
  }
}