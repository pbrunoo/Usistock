import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, take, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Fornecedor } from '../models/fornecedor';
import { EMPTY, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  list(unidadeId: string): Observable<Fornecedor[]> {
    let apiRoute = `${environment.API}v1/fornecedor/all/${unidadeId}`;
    return this.http.get<Fornecedor[]>(apiRoute);
  }

  create(fornecedor): Observable<Fornecedor> {
    let apiRoute = `${environment.API}v1/fornecedor`;
    return this.http.post<Fornecedor>(apiRoute, fornecedor).pipe(
      map(result => result),
      catchError(erro => this.viewError(erro))
    );
  }

  loadById(id): Observable<Fornecedor> {
    let apiRoute = `${environment.API}v1/fornecedor/unique/${id}`;
    return this.http.get<Fornecedor>(apiRoute).pipe(
      map(result => result),
      catchError(erro => this.viewError(erro))
    );
  }

  searchFornecedor(search, unidadeid): Observable<Fornecedor[]> {
    let apiRoute = `${environment.API}v1/fornecedor/sch/${search}/${unidadeid}`;
    return this.http.get<Fornecedor[]>(apiRoute).pipe(
      map(result => result),
      catchError(erro => this.viewError(erro))
    );
  }

  update(fornecedor): Observable<Fornecedor> {
    let apiRoute = `${environment.API}v1/fornecedor/${fornecedor.id}`;
    return this.http.put<Fornecedor>(apiRoute, fornecedor).pipe(
      map(result => result),
      catchError(erro => this.viewError(erro))
    );
  }

  delete(id: string, userId: string): Observable<any> {
    let apiRoute = `${environment.API}v1/fornecedor/${id}/${userId}`;
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
