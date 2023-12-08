import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, take, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Veiculo } from '../models/veiculo';
import { EMPTY, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {

  private readonly API = `${environment.API}v1/veiculo/all/`;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

    list(unidadeId): Observable<Veiculo[]> {
      let apiRoute = `${environment.API}v1/veiculo/all/${unidadeId}`;
      return this.http.get<Veiculo[]>(apiRoute).pipe(
        map(result => result),
        catchError(erro => this.viewError(erro))
      );
    }

    loadById(id): Observable<Veiculo> {
      let apiRoute = `${environment.API}v1/veiculo/unique/${id}`;
      return this.http.get<Veiculo>(apiRoute).pipe(
        map(result => result),
        catchError(erro => this.viewError(erro))
      );
    }

    searchAllVeiculo(search: string, unidadeId: string): Observable<Veiculo[]> {
      let apiRoute = `${environment.API}v1/veiculo/sch/${search}/${unidadeId}`;
    return this.http.get<Veiculo[]>(apiRoute).pipe(
      map(result => result),
      catchError(erro => this.viewError(erro))
    );
    }

    create(veiculo): Observable<Veiculo> {
      let apiRoute = `${environment.API}v1/veiculo`;
      return this.http.post<Veiculo>(apiRoute, veiculo).pipe(
        map(result => result),
        catchError(erro => this.viewError(erro))
      );
    }

    update(veiculo): Observable<Veiculo> {
      let apiRoute = `${environment.API}v1/veiculo/${veiculo.id}`;
      return this.http.put<Veiculo>(apiRoute, veiculo).pipe(
        map(result => result),
        catchError(erro => this.viewError(erro))
      );
    }

    delete(id: string, userId: string): Observable<any> {
      let apiRoute = `${environment.API}v1/veiculo/${id}/${userId}`;
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
