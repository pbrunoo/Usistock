import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";
import { FaturamentoComponent } from "./pages/faturamento/faturamento.component";
import { OrcamentosComponent } from './pages/orcamentos/orcamentos.component';
import { PainelControleComponent } from './pages/painel-controle/painel-controle.component';
import { RelatoriosComponent } from './pages/relatorios/relatorios.component';
import { FormEstoqueComponent } from "./pages/painel-controle/estoque/form-estoque/form-estoque.component";
import { AuthLoginService } from "./pages/login/service/auth-login.service";
import { FormPedidosComponent } from './pages/pedidos/form-pedidos/form-pedidos.component';
import { FormUserComponent } from './pages/user/form-user/form-user.component';
import { EstoqueComponent } from "./pages/painel-controle/estoque/estoque.component";
import { NotaFiscalComponent } from "./pages/faturamento/nota-fiscal/nota-fiscal.component";
import { FormNfComponent } from "./pages/faturamento/nota-fiscal/form-nf/form-nf.component";
import { FormFaturamentoComponent } from './pages/faturamento/list-faturamento/form-faturamento/form-faturamento.component';
import { FormOrcamentoComponent } from './pages/orcamentos/form-orcamento/form-orcamento.component';
import { ClientesComponent } from './pages/painel-controle/clientes/clientes.component';
import { FormClientesComponent } from './pages/painel-controle/clientes/form-clientes/form-clientes.component';
import { EmpresaComponent } from './pages/painel-controle/empresa/empresa.component';
import { FormEmpresaComponent } from './pages/painel-controle/empresa/form-empresa/form-empresa.component';
import { UnidadesComponent } from './pages/painel-controle/unidades/unidades.component';
import { FormUnidadesComponent } from './pages/painel-controle/unidades/form-unidades/form-unidades.component';
import { FuncionariosComponent } from './pages/painel-controle/funcionarios/funcionarios.component';
import { FormFuncionariosComponent } from './pages/painel-controle/funcionarios/form-funcionarios/form-funcionarios.component';
import { FornecedorComponent } from './pages/painel-controle/fornecedor/fornecedor.component';
import { FormFornecedorComponent } from './pages/painel-controle/fornecedor/form-fornecedor/form-fornecedor.component';
import { ConsumoComponent } from './pages/painel-controle/consumo/consumo.component';
import { ListFaturamentoComponent } from "./pages/faturamento/list-faturamento/list-faturamento.component";
import { FormConsumoComponent } from './pages/painel-controle/consumo/form-consumo/form-consumo.component';
import { VeiculosComponent } from './pages/painel-controle/veiculos/veiculos.component';
import { FormVeiculosComponent } from './pages/painel-controle/veiculos/form-veiculos/form-veiculos.component';
import { LoginComponent } from "./pages/login/login.component";
import { AuthGuard } from "./guards/auth.guard";
import { NgxMaskModule } from "ngx-mask";
import { SelectUnidadeComponent } from "./components/select-unidade/select-unidade.component";

import { LOCALE_ID } from '@angular/core';// IMPORTANT
import { registerLocaleData } from '@angular/common';// IMPORTANT
import localePt from '@angular/common/locales/pt';// IMPORTANT
registerLocaleData(localePt); // IMPORTANT
import { DatePipe } from '@angular/common';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';




@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule,
    NgxMaskModule.forRoot({
      dropSpecialCharacters: true
    }),
    AppRoutingModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    SweetAlert2Module.forRoot()
  ],
  declarations: [AppComponent, AdminLayoutComponent, AuthLayoutComponent, FaturamentoComponent, OrcamentosComponent, PainelControleComponent, RelatoriosComponent, FormPedidosComponent, FormUserComponent, NotaFiscalComponent, FormNfComponent, FormEstoqueComponent, FormFaturamentoComponent, FormOrcamentoComponent, ClientesComponent, FormClientesComponent, EmpresaComponent, FormEmpresaComponent, UnidadesComponent, FormUnidadesComponent, FuncionariosComponent, FormFuncionariosComponent, FornecedorComponent, FormFornecedorComponent, ConsumoComponent, FormConsumoComponent, VeiculosComponent, FormVeiculosComponent, LoginComponent, ListFaturamentoComponent, EstoqueComponent],
  providers: [AuthLoginService, AuthGuard,{
    provide: LOCALE_ID,
    useValue: "pt-BR"
  }, SelectUnidadeComponent, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {}
