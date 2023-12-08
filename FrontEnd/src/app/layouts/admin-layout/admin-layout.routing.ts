import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { PedidosComponent } from "src/app/pages/pedidos/pedidos.component";
import { UserComponent } from "../../pages/user/user.component";
import { LoginComponent } from "src/app/pages/login/login.component";
import { FaturamentoComponent } from "src/app/pages/faturamento/faturamento.component";
import { OrcamentosComponent } from "src/app/pages/orcamentos/orcamentos.component";
import { PainelControleComponent } from "src/app/pages/painel-controle/painel-controle.component";
import { RelatoriosComponent } from "src/app/pages/relatorios/relatorios.component";
import { FormPedidosComponent } from "src/app/pages/pedidos/form-pedidos/form-pedidos.component";
import { FormUserComponent } from "src/app/pages/user/form-user/form-user.component";
import { ListFaturamentoComponent } from "src/app/pages/faturamento/list-faturamento/list-faturamento.component";
import { FormNfComponent } from "src/app/pages/faturamento/nota-fiscal/form-nf/form-nf.component";
import { FormFaturamentoComponent } from "src/app/pages/faturamento/list-faturamento/form-faturamento/form-faturamento.component";
import { NotaFiscalComponent } from "src/app/pages/faturamento/nota-fiscal/nota-fiscal.component";
import { FormOrcamentoComponent } from "src/app/pages/orcamentos/form-orcamento/form-orcamento.component";
import { ClientesComponent } from "src/app/pages/painel-controle/clientes/clientes.component";
import { FormClientesComponent } from "src/app/pages/painel-controle/clientes/form-clientes/form-clientes.component";
import { EmpresaComponent } from "src/app/pages/painel-controle/empresa/empresa.component";
import { FormEmpresaComponent } from "src/app/pages/painel-controle/empresa/form-empresa/form-empresa.component";
import { UnidadesComponent } from "src/app/pages/painel-controle/unidades/unidades.component";
import { FormUnidadesComponent } from "src/app/pages/painel-controle/unidades/form-unidades/form-unidades.component";
import { EstoqueComponent } from "src/app/pages/painel-controle/estoque/estoque.component";
import { FormEstoqueComponent } from "src/app/pages/painel-controle/estoque/form-estoque/form-estoque.component";
import { FuncionariosComponent } from "src/app/pages/painel-controle/funcionarios/funcionarios.component";
import { FormFuncionariosComponent } from "src/app/pages/painel-controle/funcionarios/form-funcionarios/form-funcionarios.component";
import { FornecedorComponent } from "src/app/pages/painel-controle/fornecedor/fornecedor.component";
import { FormFornecedorComponent } from "src/app/pages/painel-controle/fornecedor/form-fornecedor/form-fornecedor.component";
import { ConsumoComponent } from "src/app/pages/painel-controle/consumo/consumo.component";
import { FormConsumoComponent } from "src/app/pages/painel-controle/consumo/form-consumo/form-consumo.component";
import { VeiculosComponent } from "src/app/pages/painel-controle/veiculos/veiculos.component";
import { FormVeiculosComponent } from "src/app/pages/painel-controle/veiculos/form-veiculos/form-veiculos.component";
import { AuthGuard } from "src/app/guards/auth.guard";


// import { RtlComponent } from "../../pages/rtl/rtl.component";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard], canLoad: [AuthGuard] },
  { path: "pedidos", component: PedidosComponent, canActivate: [AuthGuard], canLoad: [AuthGuard]  },
  { path: "faturamento", component: FaturamentoComponent, canActivate: [AuthGuard], canLoad: [AuthGuard]  },
  { path: "orcamentos", component: OrcamentosComponent, canActivate: [AuthGuard], canLoad: [AuthGuard]  },
  { path: "painel-controle", component: PainelControleComponent, canActivate: [AuthGuard], canLoad: [AuthGuard] },
  { path: "relatorios", component: RelatoriosComponent, canActivate: [AuthGuard], canLoad: [AuthGuard]  },
  { path: "user", component: UserComponent, canActivate: [AuthGuard], canLoad: [AuthGuard]  },
  { path: "login", component: LoginComponent },
  { path: "form-pedidos", component: FormPedidosComponent, canActivate: [AuthGuard], canLoad: [AuthGuard]  },
  { path: "form-user", component: FormUserComponent, canActivate: [AuthGuard], canLoad: [AuthGuard] },
  { path: "nota-fiscal", component: NotaFiscalComponent, canActivate: [AuthGuard], canLoad: [AuthGuard]  },
  { path: "form-nf", component: FormNfComponent, canActivate: [AuthGuard], canLoad: [AuthGuard] },
  { path: "list-faturamento", component: ListFaturamentoComponent, canActivate: [AuthGuard], canLoad: [AuthGuard] },
  { path: "form-faturamento", component: FormFaturamentoComponent, canActivate: [AuthGuard], canLoad: [AuthGuard]  },
  { path: "form-orcamento", component: FormOrcamentoComponent, canActivate: [AuthGuard], canLoad: [AuthGuard] },
  { path: "clientes", component: ClientesComponent, canActivate: [AuthGuard], canLoad: [AuthGuard]  },
  { path: "form-clientes", component: FormClientesComponent, canActivate: [AuthGuard], canLoad: [AuthGuard]  },
  { path: "empresa", component: EmpresaComponent, canActivate: [AuthGuard], canLoad: [AuthGuard]  },
  { path: "form-empresa", component: FormEmpresaComponent, canActivate: [AuthGuard], canLoad: [AuthGuard]  },
  { path: "unidades", component: UnidadesComponent, canActivate: [AuthGuard], canLoad: [AuthGuard]  },
  { path: "form-unidade", component: FormUnidadesComponent, canActivate: [AuthGuard], canLoad: [AuthGuard]  },
  { path: "estoque", component: EstoqueComponent, canActivate: [AuthGuard], canLoad: [AuthGuard]  },
  { path: "form-estoque", component: FormEstoqueComponent, canActivate: [AuthGuard], canLoad: [AuthGuard]  },
  { path: "funcionarios", component: FuncionariosComponent, canActivate: [AuthGuard], canLoad: [AuthGuard]  },
  { path: "form-funcionarios", component: FormFuncionariosComponent, canActivate: [AuthGuard], canLoad: [AuthGuard]  },
  { path: "fornecedor", component: FornecedorComponent, canActivate: [AuthGuard], canLoad: [AuthGuard]  },
  { path: "form-fornecedor", component: FormFornecedorComponent, canActivate: [AuthGuard]  },
  { path: "consumo", component: ConsumoComponent, canActivate: [AuthGuard], canLoad: [AuthGuard]  },
  { path: "form-consumo", component: FormConsumoComponent, canActivate: [AuthGuard], canLoad: [AuthGuard]  },
  { path: "veiculos", component: VeiculosComponent, canActivate: [AuthGuard], canLoad: [AuthGuard] },
  { path: "form-veiculos", component: FormVeiculosComponent, canActivate: [AuthGuard], canLoad: [AuthGuard]  },
  { path: "editar-user/:id", component: FormUserComponent, canActivate: [AuthGuard], canLoad: [ AuthGuard] },
  { path: "user/:id", component: UserComponent, canActivate: [AuthGuard], canLoad: [ AuthGuard] },
  { path: "editar-unidade/:id", component: FormUnidadesComponent, canActivate: [AuthGuard], canLoad: [ AuthGuard] },
  { path: "editar-cliente/:id", component: FormClientesComponent, canActivate: [AuthGuard], canLoad: [ AuthGuard] },
  { path: "editar-veiculo/:id", component: FormVeiculosComponent, canActivate: [AuthGuard], canLoad: [ AuthGuard] },
  { path: "editar-fornecedor/:id", component: FormFornecedorComponent, canActivate: [AuthGuard], canLoad: [ AuthGuard] },
  { path: "editar-consumo/:id", component: FormConsumoComponent, canActivate: [AuthGuard], canLoad: [ AuthGuard] },
  { path: "editar-funcionario/:id", component: FormFuncionariosComponent, canActivate: [AuthGuard], canLoad: [ AuthGuard] },
  { path: "editar-empresa/:id", component: FormEmpresaComponent, canActivate: [AuthGuard], canLoad: [ AuthGuard] },
  { path: "editar-estoque/:id", component: FormEstoqueComponent, canActivate: [AuthGuard], canLoad: [ AuthGuard] },
  { path: "editar-orcamento/:id", component: FormOrcamentoComponent, canActivate: [AuthGuard], canLoad: [ AuthGuard] }
  // { path: "rtl", component: RtlComponent }
];
