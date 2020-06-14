import { ProdutoModel } from './../../models/produto-model';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { Observable, Subject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ProdutoService } from '../../services/produto.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { takeUntil } from 'rxjs/operators';
import { ProdutoFormComponent } from './produto-form/produto-form.component';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  produtos$: Observable<ProdutoModel[]>;
  displayedColumns = ['imageUrl', 'title', 'description', 'price', 'operations'];
  produtos: MatTableDataSource<ProdutoModel>;

  private unsubscribe$: Subject<any> = new Subject<any>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true}) sort: MatSort;
  @ViewChild('produto', { static: false }) title: ElementRef;

  constructor(
    private produtoService: ProdutoService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.produtoService.getProdutos()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((produto) => {
        this.produtos = new MatTableDataSource<ProdutoModel>(produto);
        this.produtos.sort = this.sort;
        this.produtos.paginator = this.paginator;
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
  }

  filtro(filterValue: string) {
    this.produtos.filter = filterValue.trim().toLowerCase();

    if (this.produtos.paginator) {
      this.produtos.paginator.firstPage();
    }
  }

  del(produto: ProdutoModel){
    Swal.fire({
      title: 'Confirma a exclusão do produto?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if(result.value) {
        this.produtoService.deleteProduto(produto)
          .then(() => {
            this.snackBar.open('Produto excluido com sucesso!', 'OK', { duration: 2000 });
          })
      }
    })
  }

  novoCadastro(){
    this.dialog.open(ProdutoFormComponent, {width: '800px'});
  }

  edit(p: ProdutoModel){
    this.dialog.open(ProdutoFormComponent, { width: '800px', data: p});
  }

}
