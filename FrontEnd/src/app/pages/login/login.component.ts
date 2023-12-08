import { Component, OnInit } from '@angular/core';
import { AuthLoginService } from './service/auth-login.service';
import { Usuario } from './service/usuario';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  usuario: Usuario = {
    login: null,
    password: null,
  };
  sucesso: boolean = false;

  constructor(
    public authLogin: AuthLoginService,
    private route: Router,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
  }

  logar(){
    this.authLogin.fazerLogin(this.usuario).subscribe(
      (result: any) => {
        this.domSanitizer.bypassSecurityTrustHtml(result);
        this.sucesso = true,
        setTimeout(()=> {
          localStorage.setItem('acessoLogin','online');
          localStorage.setItem('login',this.usuario.login);
          this.sucesso = false;
          this.authLogin.viewMessage(
            `<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Seja bem vindo ${this.usuario.login}.`,
            'toast-error',
            'success'
          );
          this.route.navigate(['/dashboard']);
        },1200);

      },
      error => {
        this.authLogin.viewMessage(
          `<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Erro, usuário e/o senha incorretos.`,
          'toast-error',
          'danger'
        );
      },
      () => console.log('tudo completo')
    );

  }

}

    /*if(usuario.login === 'usuario' && usuario.senha === '123'){


      this.mostrarMenuEmitter.emit(true);
      this.router.navigate(['/']);
    }else{
      this.usuarioAutenticado = false;
    }*/
