import { Unidade } from './../../models/unidade';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SelectService } from 'src/app/services/select.service';

@Component({
  selector: 'select-unidade',
  templateUrl: './select-unidade.component.html',
  styleUrls: ['./select-unidade.component.scss']
})
export class SelectUnidadeComponent implements OnInit {

  unidades: Unidade[] = [];

 @Output() emitirShow = new EventEmitter();
  show: boolean = false;
  buttonName: boolean = true;

 @Output() emitirUnidade = new EventEmitter();
  selectedUnidade: string = null;



  constructor(private router: Router , private unidadeService: SelectService) { }

  ngOnInit() {
    //this.unidadeService.list().subscribe(result => this.unidades = result);

    this.unidadeService.list().subscribe( result => {
      this.unidades = result;
    });

  }
  pesquisarPedidos() {

    this.show = !this.show;
    if(this.show) {
      this.buttonName = false;
      this.emitirUnidade.emit(this.selectedUnidade);

    }
    else {
      this.buttonName = true;

    }
      this.emitirShow.emit(this.show);

  }

}
