import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, Observable } from 'rxjs';
import { map, take, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private readonly API = `${environment.API}v1/cliente/all/`;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
    ) { }

  list(unidadeId: string): Observable<Cliente[]> {
    let apiRoute = `${environment.API}v1/cliente/all/${unidadeId}`;
    return this.http.get<Cliente[]>(apiRoute).pipe(
      map(result => result),
      catchError(erro => this.viewError(erro))
    );
  }

  loadById(id):Observable<Cliente> {
    let apiRoute = `${environment.API}v1/cliente/unique/${id}`;
    return this.http.get<Cliente>(apiRoute).pipe(
      map(result => result),
      catchError(erro => this.viewError(erro))
    );
  }

  search(searchClient, unidadeId): Observable<Cliente[]> {
    let apiRoute = `${environment.API}v1/cliente/sch/${searchClient}/${unidadeId}`;
    return this.http.get<Cliente[]>(apiRoute).pipe(
      map(result => result),
      catchError(erro => this.viewError(erro))
    );
  }

  create(cliente): Observable<Cliente> {
    let apiRoute = `${environment.API}v1/cliente`;
    return this.http.post<Cliente>(apiRoute, cliente).pipe(
      map(result => result),
      catchError(erro => this.viewError(erro))
    );
  }

  update(cliente): Observable<Cliente> {
    let apiRoute = `${environment.API}v1/cliente/${cliente.id}`;
    return this.http.put<Cliente>(apiRoute, cliente).pipe(
      map(result => result),
      catchError(erro => this.viewError(erro))
    );
  }

  delete(id: string, userId: string): Observable<any> {
    let apiRoute = `${environment.API}v1/cliente/${id}/${userId}`;
    return this.http.delete<any>(apiRoute).pipe(
      map(result => result),
      catchError(erro => this.viewError(erro))
    );
  }

  viewError(e: any): Observable<any> {
    this.viewMessage('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Não foi possível realizar a operação.', 'toast-error','danger');
    return EMPTY;
  }

  viewMessage(message: string, type: string, estilo: string): void {
    this.toastr.show(message,'',{ closeButton: true, disableTimeOut: false,
      enableHtml: true, toastClass: "alert alert-"+estilo+" alert-with-icon",
      positionClass: 'toast-top-center'
    },
    type);
  }
}
