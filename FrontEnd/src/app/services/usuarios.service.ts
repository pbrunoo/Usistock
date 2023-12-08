import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {User} from 'src/app/models/user';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, Observable } from 'rxjs';
import { SearchUser } from '../models/searchUser';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private readonly API = `${environment.API}v1/user/all/`;


  constructor(
    private http: HttpClient,
    private toastr: ToastrService
    ) { }


  list(unidadeId: string): Observable<User[]> {
    let apiRoute = `${environment.API}v1/user/all/${unidadeId}`;
    return this.http.get<User[]>(apiRoute).pipe(
      map(result => result),
      catchError(erro => this.viewError(erro))
    );
  }

  loadById(id): Observable<User> {
    if(id){
      let apiRoute = `${environment.API}v1/user/unique/${id}`
      return this.http.get<User>(apiRoute).pipe(
        map(result => result),
        catchError(erro => this.viewError(erro))
      );
    }

  }

  create(usuario): Observable<User> {
    let apiRoute = `${environment.API}v1/user`;
    return this.http.post<User>(apiRoute, usuario).pipe(
      map(result => result),
      catchError(erro => this.viewError(erro))
    );
  }

  update(usuario): Observable<User> {
    let apiRoute = `${environment.API}v1/user/${usuario.id}`;
    return this.http.put<User>(apiRoute, usuario).pipe(
      map(result => result),
      catchError(erro => this.viewError(erro))
    );

  }

  search(search, unidadeId): Observable<User[]> {
    let apiRoute = `${environment.API}v1/user/sch/${search}/${unidadeId}`;
    return this.http.get<User[]>(apiRoute).pipe(
      map(result => result),
      catchError(erro => this.viewError(erro))
    );
  }

  delete(id: string): Observable<any> {
    let apiRoute = `${environment.API}v1/user/${id}`;
    return this.http.delete<any>(apiRoute).pipe(
      map(result => result),
      catchError(erro => this.viewError(erro))
    );
  }

  viewError(e: any): Observable<any> {
    this.viewMessage('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Não foi possível realizar a operação. Tente novamente mais tarde.', 'toast-error','danger');
    return EMPTY;
  }

  viewMessage(message: string, type: string, estilo: string): void {
    this.toastr.show(message,'',{
      closeButton: true,
      disableTimeOut: false,
      enableHtml: true,
      toastClass: "alert alert-"+estilo+" alert-with-icon",
      positionClass: 'toast-top-center'
    },
    type);
  }
}
