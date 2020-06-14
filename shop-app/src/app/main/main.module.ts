import { MaterialModule } from './../material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './views/home/home.component';
import { PessoaComponent } from './views/pessoa/pessoa.component';
import { PessoaFormComponent } from './views/pessoa/pessoa-form/pessoa-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProdutoComponent } from './views/produto/produto.component';
import { ProdutoFormComponent } from './views/produto/produto-form/produto-form.component';



@NgModule({
  declarations: [HomeComponent, PessoaComponent, PessoaFormComponent, ProdutoComponent, ProdutoFormComponent],
  entryComponents: [PessoaFormComponent, ProdutoFormComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class MainModule { }
