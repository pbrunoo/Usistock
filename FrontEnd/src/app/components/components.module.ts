import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { ButtonseditexcluitableComponent } from './buttonseditexcluitable/buttonseditexcluitable.component';
import { ButtonsFooterComponent } from './buttons-footer/buttons-footer.component';
import { SelectUnidadeComponent } from './select-unidade/select-unidade.component';

@NgModule({
  imports: [CommonModule, RouterModule, NgbModule, FormsModule, ReactiveFormsModule],
  declarations: [FooterComponent, NavbarComponent, SidebarComponent, ButtonseditexcluitableComponent, ButtonsFooterComponent, SelectUnidadeComponent],
  exports: [FooterComponent, NavbarComponent, SidebarComponent,ButtonseditexcluitableComponent, ButtonsFooterComponent, SelectUnidadeComponent]
})
export class ComponentsModule {}
