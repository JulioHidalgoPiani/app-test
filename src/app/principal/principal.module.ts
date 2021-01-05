

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModuleModule } from './../module/module.module';
import { PrincipalRoutingModule } from './principal-routing.module';
import { PrincipalComponent } from './principal/principal.component';



@NgModule({
  imports: [
    ModuleModule,
    PrincipalRoutingModule,
    CommonModule,
    FormsModule,     
  ],
  declarations: [PrincipalComponent],
  entryComponents:[]

})
export class PrincipalModule { }

