import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Empresa } from '../models/empresa';
import { Funcionario } from '../models/funcionario';
import { EMPTY, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  private readonly API = `${environment.API}v1/funcionario/all`;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  list(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(this.API).pipe(
      map(result => result),
      catchError(erro => this.viewError(erro))
    );
  }

  listEmpresa(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(`${environment.API}v1/empresa/all`).pipe(
      map(result => result),
      catchError(erro => this.viewError(erro))
    );
  }

  create(funcionario): Observable<Funcionario> {
    let apiRoute = `${environment.API}v1/funcionario`;
    return this.http.post<Funcionario>(apiRoute, funcionario).pipe(
      map(result => result),
      catchError(erro => this.viewError(erro))
    );
  }

  loadById(id): Observable<Funcionario> {
    let apiRoute = `${environment.API}v1/funcionario/unique/${id}`;
    return this.http.get<Funcionario>(apiRoute).pipe(
      map(result => result),
      catchError(erro => this.viewError(erro))
    );
  }

  searchFuncionario(search): Observable<Funcionario[]> {
    let apiRoute = `${environment.API}v1/funcionario/sch/${search}`;
    return this.http.get<Funcionario[]>(apiRoute).pipe(
      map(result => result),
      catchError(erro => this.viewError(erro))
    );
  }

  update(funcionario): Observable<Funcionario> {
    let apiRoute = `${environment.API}v1/funcionario/${funcionario.id}`;
    return this.http.put<Funcionario>(apiRoute, funcionario).pipe(
      map(result => result),
      catchError(erro => this.viewError(erro))
    );
  }

  delete(id: string, userId: string): Observable<any> {
    let apiRoute = `${environment.API}v1/funcionario/${id}/${userId}`;
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
