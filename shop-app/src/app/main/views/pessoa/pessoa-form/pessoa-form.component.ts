import { MatSnackBar } from '@angular/material/snack-bar';
import { PessoaService } from './../../../services/pessoa.service';
import { PessoaModel } from './../../../models/pessoa.model';
import { Observable, Subject } from 'rxjs';
import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-pessoa-form',
  templateUrl: './pessoa-form.component.html',
  styleUrls: ['./pessoa-form.component.css']
})
export class PessoaFormComponent implements OnInit {

  title: string;

  estados = ['MG', 'RS', 'SC', 'SP', 'RJ'];

  formRegister = this.fb.group({
    id: [undefined],
    nome: ['', [Validators.required]],
    sobrenome: ['', [Validators.required]],
    endereco: ['', [Validators.required]],
    cidade: ['', [Validators.required]],
    estado: ['', [Validators.required]],
    telefone: ['', []],
    celular: ['', [Validators.required]],
    email: ['', [Validators.required]],
    cpf: ['', [Validators.required]],
    rg: ['', []],
  });

  constructor(
    public dialogRef: MatDialogRef<PessoaFormComponent>,
    @Inject(MAT_DIALOG_DATA) public pessoaModel: PessoaModel,

    private fb: FormBuilder,
    private pessoaService: PessoaService,
    // private estadoService: EstadoService,
    private snackBar: MatSnackBar,
  ) {
    if (this.pessoaModel != null) {
      this.formRegister.setValue(pessoaModel);
      this.title = 'Atualização Cadastro Pessoa';
    } else {
      this.title = 'Novo Cadastro Pessoa';
    }
  }

  ngOnInit() {

  }

  onSubmit() {
    let pessoaModal: PessoaModel = this.formRegister.value;
    if (!pessoaModal.id) {
      this.addCliente(pessoaModal);
    } else {
      this.updateCliente(pessoaModal);
    }
  }

  addCliente(pessoaModel: PessoaModel) {
    this.pessoaService.addPessoa(pessoaModel)
      .then(() => {
        this.snackBar.open('Cadastro realizado com sucesso!', 'OK', { duration: 2000 });
        this.cancelar();
      })
      .catch(() => {
        this.snackBar.open('Erro ao realizar cadastro', 'OK', { duration: 2000 });
      })
  }

  updateCliente(pessoaModel: PessoaModel) {
    this.pessoaService.updatePessoa(pessoaModel)
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
