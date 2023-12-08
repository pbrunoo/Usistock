import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Fornecedor } from 'src/app/models/fornecedor';
import { ConsumoService } from 'src/app/services/consumo.service';
import { SelectService } from 'src/app/services/select.service';
import { Unidade } from 'src/app/models/unidade';

@Component({
  selector: 'app-form-consumo',
  templateUrl: './form-consumo.component.html',
  styleUrls: ['./form-consumo.component.scss']
})
export class FormConsumoComponent implements OnInit {

  dataData= new Date();
  unidades: Unidade[];
  fornecedores: Fornecedor[];
  opcao: string;

  formConsumo: any = {
    produto: null,
    unidadeId: null,
    fornecedor: null,
    status: 1,
    validationControllers: {
      userCreated: localStorage.getItem('login'),
      createdAt: this.datepipe.transform(this.dataData, 'dd/MM/yyyy'),
    }

  }

  idEdit: any;

  constructor(
    private router: Router,
    public datepipe: DatePipe,
    private consumoService: ConsumoService,
    private selectService: SelectService,
    private activatedRoute: ActivatedRoute,
    private location: Location
    ) { }

  ngOnInit() {
    this.selectService.list().subscribe(result => {
      this.unidades = result;
    });

    this.idEdit = this.activatedRoute.snapshot.params['id'];

    switch(this.router.url) {
      case "/form-consumo":
        this.opcao = "Cadastrar";
      break;
      case `/editar-consumo/${this.idEdit}`:
        this.opcao = "Editar";

        this.consumoService.loadById(this.idEdit).subscribe((result: any) => {
          if(result) {
            this.formConsumo = result;
            this.consumoService.listFornecedor(result.unidadeId).subscribe(result => {this.fornecedores = result});
            this.formConsumo.fornecedor = result.fornecedor;
            this.formConsumo.validationControllers.userUpdated = localStorage.getItem('login');
            this.formConsumo.validationControllers.updateAt = this.datepipe.transform(this.dataData, 'dd/MM/yyyy')
          }
          result = [];
        });

      break;
    }

  }

  enviarConsumo(enviadoConsumo) {
    if(enviadoConsumo == 1) {
      this.consumoService.create(this.formConsumo).subscribe(
        success => {
          this.consumoService.viewMessage(
            `<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> O produto ${this.formConsumo.produto} foi criado.`,
            'toast-error',
            'success'
          );
          this.router.navigate(['/consumo']);
        },
        error => {
          this.consumoService.viewMessage(
            `<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Erro ao atualizar, tente mais tarde.`,
            'toast-error',
            'danger'
          );
        },
        () => console.log('tudo completo')

      );
      return;
    }

    if(enviadoConsumo == 2) {
      this.consumoService.update(this.formConsumo).subscribe(
        success => {
          this.consumoService.viewMessage(
            `<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> O produto ${this.formConsumo.produto} foi atualizado.`,
            'toast-error',
            'success'
          );
          this.router.navigate(['/consumo']);
        },
        error => {
          this.consumoService.viewMessage(
            `<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Erro ao atualizar, tente mais tarde.`,
            'toast-error',
            'danger'
          );

        },
        () => console.log('tudo completo')
      );
    }
  }

  onChange($event, unidadeValue) {
   this.consumoService.listFornecedor(unidadeValue).subscribe(result => {this.fornecedores = result;});
  }

}
