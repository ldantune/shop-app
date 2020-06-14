import { ProdutoService } from './../../../services/produto.service';
import { ProdutoModel } from './../../../models/produto-model';
import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-produto-form',
  templateUrl: './produto-form.component.html',
  styleUrls: ['./produto-form.component.css']
})
export class ProdutoFormComponent implements OnInit {

  title: string;

  formRegister = this.fb.group({
    id: [undefined],
    imageUrl: ['', [Validators.required]],
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    price: ['', [Validators.required]],
    isFavorite: ['', []]
  });

  constructor(
    public dialogRef: MatDialogRef<ProdutoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public produtoModel: ProdutoModel,

    private fb: FormBuilder,
    private produtoService: ProdutoService,
    // private estadoService: EstadoService,
    private snackBar: MatSnackBar,
  ) {
    if (this.produtoModel != null) {
      this.formRegister.setValue(produtoModel);
      this.title = 'Atualização Cadastro Produto';
    } else {
      this.title = 'Novo Cadastro Produto';
    }
  }

  ngOnInit() {

  }

  onSubmit() {
    let produtoModel: ProdutoModel = this.formRegister.value;
    if (!produtoModel.id) {
      this.addProduto(produtoModel);
    } else {
      this.updateProduto(produtoModel);
    }
  }

  addProduto(produtoModel: ProdutoModel) {
    this.produtoService.addProduto(produtoModel)
      .then(() => {
        this.snackBar.open('Cadastro realizado com sucesso!', 'OK', { duration: 2000 });
        this.cancelar();
      })
      .catch(() => {
        this.snackBar.open('Erro ao realizar cadastro', 'OK', { duration: 2000 });
      })
  }

  updateProduto(produtoModel: ProdutoModel) {
    this.produtoService.updateProduto(produtoModel)
      .then(() => {
        this.snackBar.open('Cadastro atualizado sucesso!', 'OK', { duration: 2000 });
        this.cancelar();
      })
      .catch((e) => {
        this.snackBar.open('Erro ao atualizar cadastro!', 'OK', { duration: 2000 });
      })
  }
  
  cancelar(): void {
    this.dialogRef.close();
  }

}
