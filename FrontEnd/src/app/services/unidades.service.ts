import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Unidade } from 'src/app/models/unidade';
import { map, take, catchError } from 'rxjs/operators';
import { Empresa } from '../models/empresa';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnidadesService {

  private readonly API = `${environment.API}v1/unidade/all/`;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  list() {
    return this.http.get<Unidade[]>(`${environment.API}v1/unidade/all/unidadeEmpresa`).pipe(
      map(result => result),
      catchError(erro => this.viewError(erro))
    );
  }

  listEmpresa(): Observable<Empresa[]> {
    const apiRoute = `${environment.API}v1/empresa/all/`;

    return this.http.get<Empresa[]>(apiRoute).pipe(
      map(result => result),
      catchError(erro => this.viewError(erro))
    );
  }

  search(search): Observable<Unidade[]> {
    let apiRoute = `${environment.API}v1/unidade/sch/${search}`;
    return this.http.get<Unidade[]>(apiRoute).pipe(
      map(result => result),
      catchError(erro => this.viewError(erro))
    );
  }

  create(unidade): Observable<Unidade> {
    let apiRoute = `${environment.API}v1/unidade`;
    return this.http.post<Unidade>(apiRoute, unidade).pipe(
      map(result => result),
      catchError(erro => this.viewError(erro))
    );;
  }

  delete(id: string, userId: string): Observable<any> {
    let apiRoute = `${environment.API}v1/unidade/${id}/${userId}`;
    return this.http.delete<any>(apiRoute).pipe(
      map(result => result),
      catchError(erro => this.viewError(erro))
    );
  }

  loadById(id): Observable<Unidade> {
    let apiRoute = `${environment.API}v1/unidade/unique/${id}`;
    return this.http.get<Unidade>(apiRoute).pipe(
      map(result => result),
      catchError(erro => this.viewError(erro))
    );
  }

  update(unidade): Observable<Unidade> {
    let apiRoute = `${environment.API}v1/unidade/${unidade.id}`;
    return this.http.put<Unidade>(apiRoute, unidade).pipe(
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
