import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Unidade } from '../models/unidade';

@Injectable({
  providedIn: 'root'
})
export class SelectService {


  private readonly API = `${environment.API}v1/unidade/all`;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) { }
  list(): Observable<Unidade[]> {
    return this.http.get<Unidade[]>(this.API).pipe(
      map(result => result),
      catchError(erro => this.viewError(erro))
    )
  }

  viewError(e: any): Observable<any> {
    this.viewMessage('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Não foi possível realizar a operação.', 'toast-error','danger');
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
