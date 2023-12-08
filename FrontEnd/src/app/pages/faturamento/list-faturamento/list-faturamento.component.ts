import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-faturamento',
  templateUrl: './list-faturamento.component.html',
  styleUrls: ['./list-faturamento.component.scss']
})
export class ListFaturamentoComponent implements OnInit {
  mostrar: any;
  constructor() { }

  ngOnInit(): void {
  }
  pesquisarP(evento) {
    this.mostrar = evento;
  }
}
