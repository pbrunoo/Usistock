import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Consumo } from '../models/consumo';
import { Estoque } from '../models/estoque';
import { Fornecedor } from '../models/fornecedor';
import { Produto } from '../models/orcamento';
import { Pedido } from '../models/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(private http: HttpClient) { }

  list(unidadeId: string) {
    let apiRoute = `${environment.API}v1/pedidos/all/${unidadeId}`;
    return this.http.get<Pedido[]>(apiRoute);
  }

  listProduto(unidadeId: string) {
    let apiRoute = `${environment.API}v1/estoque/all/${unidadeId}`;
    return this.http.get<Estoque[]>(apiRoute);
  }

  listFornecedor(unidadeId: string) {
    let apiRoute = `${environment.API}v1/fornecedor/all/${unidadeId}`;
    return this.http.get<Fornecedor[]>(apiRoute);
  }

  loadConsumo(unidadeId: string) {
    let apiRoute = `${environment.API}v1/consumo/all/${unidadeId}`;
    return this.http.get<Consumo[]>(apiRoute);
  }

  create(pedido) {
    let apiRoute = `${environment.API}v1/pedido`;
    return this.http.post(apiRoute, pedido);
  }
}
