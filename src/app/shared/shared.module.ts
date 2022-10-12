import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  ToolbarComponent } from './components/toolbar/toolbar.component';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RutValidador } from './directives/validar-rut.directive';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [ToolbarComponent,
  RutValidador],
  exports: [
    ToolbarComponent,
    MaterialModule,
    RutValidador
    ],
    providers:[
      RutValidador
    ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA  ],
})
export class SharedModule { }
