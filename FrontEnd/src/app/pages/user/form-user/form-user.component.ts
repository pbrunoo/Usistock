import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { SelectService } from '../../../services/select.service';
import { Unidade } from 'src/app/models/unidade';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';


@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent implements OnInit {

  unidades: Unidade[];
  opcao: string;

  formUser: any = {
    login: null,
    senha: null,
    email: null,
    nome: null,
    sexo: null,
    dataNascimento: null,
    telefone: null,
    endereco: null,
    bairro: null,
    cidade: null,
    cep: null,
    nivelAcesso: null,
    unidadeId: null,
    foto: null,
    status: 1
  }

  idEdit: any;

  constructor(
    private router: Router,
    private usuarioService: UsuariosService,
    private unidadeService: SelectService,
    private location: Location,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit() {

    this.unidadeService.list().subscribe(result => {
      this.unidades = result;
    });

    this.idEdit = this.activatedRoute.snapshot.params['id'];

    switch(this.router.url){
      case "/form-user":
        this.opcao = "Cadastrar";
      break;
      case `/editar-user/${this.idEdit}`:
        this.opcao = "Editar";

        this.usuarioService
        .loadById(this.idEdit)
        .subscribe((result: any) => {
          if(result) {
            this.formUser = result;
            console.log(result)
            return;
          }
          result = [];
        });
      break;
    }
  }

  user(enviadoUser) {
    if (enviadoUser == 1) {
      this.usuarioService.create(this.formUser).subscribe(
        success => {
          this.usuarioService.viewMessage(
            `<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> O usuário ${this.formUser.login} foi criado.`,
            'toast-error',
            'success'
          );
          this.router.navigate(['/user']);
        },
        error => {
          this.usuarioService.viewMessage(
            `<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Erro ao cadastrar, tente novamente mais tarde.`,
            'toast-error',
            'danger'
          );
        },
        () => console.log('tudo completo')

      );
      return;
    }

    if(enviadoUser == 2) {
      this.usuarioService.update(this.formUser).subscribe(
        success => {
          this.usuarioService.viewMessage(
            `<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> O usuário ${this.formUser.login} Foi atualizado.`,
            'toast-error',
            'success'
          );
          this.router.navigate(['/user']);
        },
        error => {
          this.usuarioService.viewMessage(
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
