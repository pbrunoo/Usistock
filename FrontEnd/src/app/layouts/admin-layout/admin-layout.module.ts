import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ModalModule } from 'ngx-bootstrap/modal'

import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { PedidosComponent } from "src/app/pages/pedidos/pedidos.component";
import { UserComponent } from "../../pages/user/user.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { TypographyComponent } from "../../pages/typography/typography.component";
import { ComponentsModule } from "src/app/components/components.module";
// import { RtlComponent } from "../../pages/rtl/rtl.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxMaskModule } from "ngx-mask";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgxMaskModule.forChild(),
    ReactiveFormsModule,
    ComponentsModule,
    ModalModule
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    TablesComponent,
    PedidosComponent,
    TypographyComponent


    // RtlComponent
  ],
  exports: [
  ]
})
export class AdminLayoutModule {}
