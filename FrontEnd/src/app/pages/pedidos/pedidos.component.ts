import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
 


@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent implements OnInit {

 // public show: boolean = false;
 // public buttonName: any = true;
 mostrar: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  formPedidos(){
    this.router.navigate(["/form-pedidos"]);
  }
 /* pesquisarPedidos() {
    this.show = !this.show;
    if(this.show)
        this.buttonName = false;
    else
        this.buttonName = true;
}*/
  pesquisarP(evento) {
    this.mostrar = evento;
  }
}
