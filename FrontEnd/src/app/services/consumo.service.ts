import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, take, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Consumo } from '../models/consumo';
import { Fornecedor } from '../models/fornecedor';
import { EMPTY, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ConsumoService {

  private readonly API = `${environment.API}v1/consumo/all/`;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  list(unidadeId: string): Observable<Consumo[]> {
    let apiRoute = `${environment.API}v1/consumo/all/consumoFornecedor/${unidadeId}`;
    return this.http.get<Consumo[]>(apiRoute).pipe(
      map(result => result),
      catchError(erro => this.viewError(erro))
    );
  }

  listFornecedor(unidadeId: string): Observable<Fornecedor[]> {
    let apiRoute = `${environment.API}v1/fornecedor/all/${unidadeId}`;
    return this.http.get<Fornecedor[]>(apiRoute).pipe(
      map(result => result),
      catchError(erro => this.viewError(erro))
    );
  }

  loadById(id): Observable<Consumo> {
    let apiRoute = `${environment.API}v1/consumo/unique/${id}`;
    return this.http.get<Consumo>(apiRoute).pipe(
      map(result => result),
      catchError(erro => this.viewError(erro))
    );
  }

  searchConsumo(search, unidadeId): Observable<Consumo[]> {
    let apiRoute = `${environment.API}v1/consumo/sch/${search}/${unidadeId}`;
    return this.http.get<Consumo[]>(apiRoute).pipe(
      map(result => result),
      catchError(erro => this.viewError(erro))
    );
  }

  create(consumo): Observable<Consumo> {
    let apiRoute = `${environment.API}v1/consumo`;
    return this.http.post<Consumo>(apiRoute, consumo).pipe(take(3));
  }

  update(consumo): Observable<Consumo> {
    let apiRoute = `${environment.API}v1/consumo/${consumo.id}`;
    return this.http.put<Consumo>(apiRoute, consumo);
  }

  delete(id: string, userId: string): Observable<any> {
    let apiRoute = `${environment.API}v1/consumo/${id}/${userId}`;
    return this.http.delete(apiRoute).pipe(
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
