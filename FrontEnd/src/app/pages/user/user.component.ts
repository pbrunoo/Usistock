import { HttpClient } from '@angular/common/http';
import { debounceTime, map, mergeAll, switchMap } from 'rxjs/operators';
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from 'sweetalert2'
import { UsuariosService } from "src/app/services/usuarios.service";
import {User} from 'src/app/models/user';
import { fromEvent, Observable, of } from "rxjs";


@Component({
  selector: "app-user",
  templateUrl: "user.component.html",
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @ViewChild('searhsUser', {static: false }) searchInfo!: ElementRef<HTMLInputElement>;
  pesquisarUser: string;
  data = false;
  users$: Observable<User[]>
  mostrar: any;
  status = 0;
  idUnidade: string;

  constructor(private router: Router ,
    private usuarioService: UsuariosService,
    private http: HttpClient
    ) { }

  ngOnInit() {

  }

  formUsuario(){
    this.router.navigate(["/form-user"]);
  }
  pesquisarP(evento) {
    this.mostrar = evento;
  }

  listUsersUnidadeById(unidadeId): void {
    this.users$ = this.usuarioService.list(unidadeId);
    this.idUnidade = unidadeId;
    this.data = true;
  }

  searchAll() {
    let keyup$ = fromEvent(this.searchInfo.nativeElement, 'keyup');
     this.users$ = keyup$.pipe(
       debounceTime(700),
       switchMap(() => this.filtrePerson(this.pesquisarUser))
     );
   }

   filtrePerson(pesquisarUser: string): Observable<User[]> {
     if(pesquisarUser.length === 0) {
       return this.users$ = this.usuarioService.list(this.idUnidade);
     }
     return this.usuarioService.search(pesquisarUser, this.idUnidade);
   }

  onEdit(id): void {
    this.router.navigate([`/editar-user/${id}`]);

  }

  onDelete(id): void {
    Swal.fire({
      title: 'Tem Certeza?',
      text: "Deseja excluir o usuário?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#eb5e2e',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sim, deletar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.delete(id).subscribe(()=> {
          this.usuarioService.viewMessage(
            '<span class="tim-icons icon-bell-55" [data-notify]="icon"></span>O usuário foi excluido.',
            'toast-error',
            'danger'
          );
          this.listUsersUnidadeById(this.idUnidade);
        });
      }
    });
  }

}
