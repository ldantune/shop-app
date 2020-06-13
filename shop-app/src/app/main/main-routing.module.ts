import { PessoaComponent } from './views/pessoa/pessoa.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';


const routes: Routes = [
  {path: '', redirectTo: '/main/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'pessoas', component: PessoaComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
