import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  @Input('images') images: object[];
  constructor() { }

  ngOnInit(): void {
    console.log(this.images);
  }

}
