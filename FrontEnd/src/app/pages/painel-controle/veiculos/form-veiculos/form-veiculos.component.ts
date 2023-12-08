import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Unidade } from 'src/app/models/unidade';
import { SelectService } from 'src/app/services/select.service';
import { VeiculoService } from 'src/app/services/veiculo.service';

@Component({
  selector: 'app-form-veiculos',
  templateUrl: './form-veiculos.component.html',
  styleUrls: ['./form-veiculos.component.scss']
})
export class FormVeiculosComponent implements OnInit {

  dataData= new Date();
  userId: any;
  unidades: Unidade[];
  idEdit: any;
  opcao: string;

  formVeiculo: any = {
    veiculo: null,
    placa: null,
    responsavel: null,
    unidadeId: null,
    status: 1,
    validationControllers:{
      userCreated: localStorage.getItem('login'),
      createdAt: this.datepipe.transform(this.dataData, 'dd/MM/yyyy'),
    }
  }
  constructor(
    private router: Router,
    private selectService: SelectService,
    private activatedRoute: ActivatedRoute,
    private veiculoService: VeiculoService,
    public datepipe: DatePipe,
    private location: Location
    ) { }

  ngOnInit() {
    this.selectService.list().subscribe(result => {
      this.unidades = result;
    });
    this.idEdit = this.activatedRoute.snapshot.params['id'];
    switch(this.router.url) {
      case "/form-veiculos":
        this.opcao = "Cadastrar";
      break;
      case `/editar-veiculo/${this.idEdit}`:
        this.opcao = "Editar";
        this.veiculoService.loadById(this.idEdit).subscribe((result:any) => {
          if(result) {
            this.formVeiculo = result;
            this.formVeiculo.validationControllers.userUpdated = localStorage.getItem('login');
            this.formVeiculo.validationControllers.updateAt = this.datepipe.transform(this.dataData, 'dd/MM/yyyy');
            return;
          }
          result = [];
        });

      break;
    }

  }

  enviarVeiculo(enviadoVeiculo) {
    if(enviadoVeiculo === 1) {
      this.veiculoService.create(this.formVeiculo).subscribe(
        success => {
          this.veiculoService.viewMessage(
            `<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> O veículo ${this.formVeiculo.veiculo} foi criado.`,
            'toast-error',
            'success'
          );
          this.router.navigate(['/veiculos']);
        },
        error => {
          this.veiculoService.viewMessage(
            `<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Erro ao cadastrar, tente novamente mais tarde.`,
            'toast-error',
            'danger'
          );
        },
        () => console.log('tudo completo')
      );

    }

    if(enviadoVeiculo === 2) {
      this.veiculoService.update(this.formVeiculo).subscribe(
        success => {
          this.veiculoService.viewMessage(
            `<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> O veículo ${this.formVeiculo.veiculo} foi atualizado.`,
            'toast-error',
            'success'
          );
          this.router.navigate(['/veiculos']);

        },
        error => {
          this.veiculoService.viewMessage(
            `<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Erro ao cadastrar, tente novamente mais tarde.`,
            'toast-error',
            'danger'
          );
        },
        () => console.log('tudo completo')
      );
    }

  }

}
