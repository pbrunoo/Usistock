import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'buttonseditexcluitable',
  templateUrl: './buttonseditexcluitable.component.html',
  styleUrls: ['./buttonseditexcluitable.component.scss']
})
export class ButtonseditexcluitableComponent implements OnInit {

  @Input() teste;
  constructor() { }

  ngOnInit() {
    console.log(this.teste);
  }

}
