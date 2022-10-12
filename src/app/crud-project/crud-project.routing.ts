import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  {
    path: '',
    children: [
       {
        path: '',
        redirectTo: 'Home',
        pathMatch: 'full'
        },
        {
            path: 'Home',
            component: MainComponent
        },
    ]
},
];

 @NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CrudProjectRoutingModule { }
