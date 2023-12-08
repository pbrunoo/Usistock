import { Route } from '@angular/compiler/src/core';
import { EventEmitter, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthLoginService } from '../pages/login/service/auth-login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {


  mostrarMenuEmitter = new EventEmitter<boolean>();

  constructor(
    private authLogin: AuthLoginService,
    private router: Router
  ) { }

  canActivate (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) : Observable<boolean> | boolean {
     return this.verificarAcesso();
  }

  private verificarAcesso() {
    if(localStorage.getItem('acessoLogin')==='online') {
      this.mostrarMenuEmitter.emit(true);
      return true;
    }else {
      this.router.navigate(['/login']);
    return false;
    }
  }

  canLoad(route: Route): Observable<boolean>|Promise<boolean>|boolean {
    console.log("canLoad carregado");
    return this.verificarAcesso();
  }
}

