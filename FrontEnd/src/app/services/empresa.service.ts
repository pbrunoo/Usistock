import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, Observable } from 'rxjs';
import { map, take, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Empresa, Servicos } from '../models/empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private readonly API = `${environment.API}v1/empresa/all/`;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
    ) { }

  list(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(this.API).pipe(
      map(result => result),
      catchError(erro => this.viewError(erro))
    );
  }

  create(empresa): Observable<Empresa> {
    let apiRoute = `${environment.API}v1/empresa`;
    return this.http.post<Empresa>(apiRoute, empresa).pipe(
      map(result => result),
      catchError(erro => this.viewError(erro))
    );
  }

  createServices(empresaId: string, servicos: Servicos): Observable<Servicos> {
    let apiRoute = `${environment.API}v1/empresa/servicos/${empresaId}`;
    return this.http.post<Servicos>(apiRoute, servicos).pipe(
      map(result => result),
      catchError(erro => this.viewError(erro))
    );
  }

  loadById(id): Observable<Empresa> {
    let apiRoute = `${environment.API}v1/empresa/unique/${id}`;
    return this.http.get<Empresa>(apiRoute).pipe(
      map(result => result),
      catchError(erro => this.viewError(erro))
    );
  }

  localServiceId(empresaId): Observable<Servicos[]> {
    let apiRoute  = `${environment.API}v1/empresa/servicos/${empresaId}`;
    return this.http.get<Servicos[]>(apiRoute).pipe(
      map(result => result),
      catchError(erro => this.viewError(erro))
    );
  }

  searchEmpresa(search): Observable<Empresa[]> {
    let apiRoute = `${environment.API}v1/empresa/sch/${search}`;
    return this.http.get<Empresa[]>(apiRoute).pipe(
      map(result => result),
      catchError(erro => this.viewError(erro))
    );
  }

  updateEmpresa(empresa): Observable<Empresa> {
    let apiRoute = `${environment.API}v1/empresa/${empresa.id}`;
    return this.http.put<Empresa>(apiRoute, empresa).pipe(
      map(result => result),
      catchError(erro => this.viewError(erro))
    );
  }

  delete(id: string, userId: string): Observable<any> {
    let apiRoute = `${environment.API}v1/empresa/${id}/${userId}`;
    return this.http.delete<any>(apiRoute).pipe(
      map(result => result),
      catchError(erro => this.viewError(erro))
    );
  }

  deleteServicos(empresaId: string, cnae: number): Observable<any> {
    let apiRoute = `${environment.API}v1/empresa/servicos/${empresaId}/${cnae}`;
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
    this.toastr.show(message,'',{ closeButton: true, disableTimeOut: false,
      enableHtml: true, toastClass: "alert alert-"+estilo+" alert-with-icon",
      positionClass: 'toast-top-center'
    },
    type);
  }
}
