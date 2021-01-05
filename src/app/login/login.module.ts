import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginContentComponent } from './login-content/login-content.component';
import { ModuleModule } from './../module/module.module';

@NgModule({
  declarations: [
    LoginContentComponent,
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ModuleModule,   
  ],
  exports: [
  ],
})
export class LoginModule { }
