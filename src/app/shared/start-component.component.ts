import { Component, OnChanges, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-start-component',
  template: `
    <div class="crop"
     [style.width.px]="cropWidth"
     [title]="rating"
      (click) = 'onClick()'>
  <div style="width: 75px">
    <span class="fa fa-star"></span>
    <span class="fa fa-star"></span>
    <span class="fa fa-star"></span>
    <span class="fa fa-star"></span>
    <span class="fa fa-star"></span>
  </div>
</div>

  `,
  styles: [`.crop { overflow: hidden; margin:0 auto;
  }
  div {
    cursor: pointer;
  }`
  ]
})
export class StartComponentComponent implements OnChanges {
@Input() rating:number = 0;
cropWidth : number = 75;
@Output() ratingCLicked : EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

  ngOnChanges(): void {
    this.cropWidth = this.rating * 75/5;

  }

  onClick(): void {
    this.ratingCLicked.emit(`Product with the Rating ${this.rating}`);
  }
}
