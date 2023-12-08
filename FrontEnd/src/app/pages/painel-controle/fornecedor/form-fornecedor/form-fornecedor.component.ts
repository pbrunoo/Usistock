import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FornecedorService } from 'src/app/services/fornecedor.service';
import { SelectService } from 'src/app/services/select.service';
import { Unidade } from 'src/app/models/unidade';

@Component({
  selector: 'app-form-fornecedor',
  templateUrl: './form-fornecedor.component.html',
  styleUrls: ['./form-fornecedor.component.scss']
})
export class FormFornecedorComponent implements OnInit {

  unidades: Unidade[];
  idEdit: any;
  dataData= new Date();
  opcao: string;

  formFornecedor: any = {
    cpfCnpj: null,
    razaoSocial: null,
    unidadeId: null,
    telefone: null,
    email: null,
    responsavel: null,
    endereco: null,
    status: 1,
    validationControllers: {
      userCreated: localStorage.getItem('login'),
      createAt: this.datepipe.transform(this.dataData, 'dd/MM/yyyy')

    }
  }
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private datepipe: DatePipe,
    private selectService: SelectService,
    private fornecedorService: FornecedorService,
    private location: Location
    ) { }

  ngOnInit() {
    this.selectService.list().subscribe(result => {
      this.unidades = result;
    });
    this.idEdit = this.activatedRoute.snapshot.params['id'];

    switch(this.router.url){
      case "/form-fornecedor":
        this.opcao = "Cadastrar";
      break;
      case `/editar-fornecedor/${this.idEdit}`:
        this.opcao = "Editar";

        this.fornecedorService.loadById(this.idEdit).subscribe((result: any)=> {
          if(result) {
            this.formFornecedor = result;
            this.formFornecedor.validationControllers.userUpdated = localStorage.getItem('login');
            this.formFornecedor.validationControllers.updateAt = this.datepipe.transform(this.dataData, 'dd/MM/yyyy');

            return;
          }
          result = [];
        });


      break;
    }
  }

  enviarFornecedor(fornecedorEnviado) {
    if(fornecedorEnviado === 1) {
     this.fornecedorService.create(this.formFornecedor).subscribe(
        success => {
          this.fornecedorService.viewMessage(
            `<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> O fornecedor ${this.formFornecedor.razaoSocial} foi criado.`,
            'toast-error',
            'success'
          );
          this.router.navigate(['/fornecedor']);
        },
        error => {
          this.fornecedorService.viewMessage(
            `<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Erro ao cadastrar, tente novamente mais tarde.`,
            'toast-error',
            'danger'
          );
        },
        () => console.log('tudo completo')
      );
    }
    if(fornecedorEnviado === 2) {
      this.fornecedorService.update(this.formFornecedor).subscribe(
        success => {
          this.fornecedorService.viewMessage(
            `<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> O fornecedor ${this.formFornecedor.razaoSocial} Foi atualizado.`,
            'toast-error',
            'success'
          );
          this.router.navigate(['/fornecedor']);
        },
        error => {
          this.fornecedorService.viewMessage(
            `<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Erro ao atualizar, tente mais tarde.`,
            'toast-error',
            'danger'
          );
        },
        () => console.log('tudo completo')
      );
    }
  }


}
