import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MainComponent } from './components/main/main.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CrudProjectRoutingModule } from './crud-project.routing';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CrudProjectRoutingModule,

  ],
  declarations: [MainComponent,

  ],
  providers:[DatePipe],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA],

})
export class CrudProjectModule { }
