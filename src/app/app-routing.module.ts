import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmrComponent } from './emr/emr.component';

const routes: Routes = [
  { path: 'emr', component:EmrComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
