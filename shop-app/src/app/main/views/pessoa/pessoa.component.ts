// import { PessoaModel } from './../../models/pessoa.model';
// import { Swal } from 'sweetalert2';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { PessoaModel } from '../../models/pessoa.model';
import { takeUntil } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { PessoaService } from '../../services/pessoa.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Subject, Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { PessoaFormComponent } from './pessoa-form/pessoa-form.component';

@Component({
  selector: 'app-pessoa',
  templateUrl: './pessoa.component.html',
  styleUrls: ['./pessoa.component.css']
})
export class PessoaComponent implements OnInit {

  pessoas$: Observable<PessoaModel[]>;
  displayedColumns = ['id', 'nome', 'sobrenome', 'cpf', 'celular', 'operations'];
  pessoas: MatTableDataSource<PessoaModel>;

  private unsubscribe$: Subject<any> = new Subject<any>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true}) sort: MatSort;
  @ViewChild('pessoa', { static: false }) nome: ElementRef;

  constructor(
    private pessoaService: PessoaService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.pessoaService.getPessoas()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((pessoa) => {
        this.pessoas = new MatTableDataSource<PessoaModel>(pessoa);
        this.pessoas.sort = this.sort;
        this.pessoas.paginator = this.paginator;
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
  }

  filtro(filterValue: string) {
    this.pessoas.filter = filterValue.trim().toLowerCase();

    if (this.pessoas.paginator) {
      this.pessoas.paginator.firstPage();
    }
  }

  del(pessoa: PessoaModel){
    Swal.fire({
      title: 'Confirma a exclusão do cliente?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if(result.value) {
        this.pessoaService.deletePessoa(pessoa)
          .then(() => {
            this.snackBar.open('Cliente excluido com sucesso!', 'OK', { duration: 2000 });
          })
      }
    })
  }

  novoCadastro(){
    this.dialog.open(PessoaFormComponent, {width: '800px'});
  }

  edit(p: PessoaModel){
    this.dialog.open(PessoaFormComponent, { width: '800px', data: p});
  }

}
