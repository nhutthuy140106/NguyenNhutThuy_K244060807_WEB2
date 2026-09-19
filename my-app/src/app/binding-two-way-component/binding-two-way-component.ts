import { Component } from '@angular/core';

@Component({
  selector: 'app-binding-two-way-component',
  standalone: false,
  styleUrl: './binding-two-way-component.css',
  templateUrl: './binding-two-way-component.html',
})
export class BindingTwoWayComponent {
  public hsa: number = 0;
  public hsb: number = 0;
  public hsc: number = 0;
  public result: string = "Kết quả ở đây";
  giaiPTbac2(){
    if(this.hsa==0){
      if(this.hsb==0 && this.hsc==0){
        this.result = "Phương trình vô số nghiệm";
      }
      else if(this.hsb==0 && this.hsc!=0){
        this.result = "<font color='red'>Phương trình vô nghiệm</font>";
      }
      else{
        let x = (-this.hsc) / this.hsb;
        this.result = "X= " + x;
      }
    }
    else{
        let delta = Math.pow(this.hsb, 2) - 4 * this.hsa * this.hsc;
        if(delta < 0){
          this.result = "<font color='red'>Phương trình vô nghiệm</font>";
        }
        else if(delta == 0){
          let x = (-this.hsb) / (2 * this.hsa);
          this.result = "Phương trình có nghiệm kép: X1 = X2 = " + x;
        }
        else{
          let x1 = (-this.hsb + Math.sqrt(delta)) / (2 * this.hsa);
          let x2 = (-this.hsb - Math.sqrt(delta)) / (2 * this.hsa);
          this.result = "Phương trình có 2 nghiệm phân biệt: X1 = " + x1 + ", X2 = " + x2;
        }     
      }           
    }
  }
