import { ProdutoModel } from './../models/produto-model';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private produtosCollection: AngularFirestoreCollection<ProdutoModel> = this.afs.collection('produtos');

  constructor(private afs: AngularFirestore) { }

  getProdutos(): Observable<ProdutoModel[]> {
    return this.produtosCollection.valueChanges();
  }

  addProduto(p: ProdutoModel){
    p.id = this.afs.createId();
    return this.produtosCollection.doc(p.id).set(p);
    //return this.productsCollection.add(p);
  }

  deleteProduto(p: ProdutoModel){
    return this.produtosCollection.doc(p.id).delete();
  }

  updateProduto(p: ProdutoModel){
    return this.produtosCollection.doc(p.id).set(p);
  }

  searchByTitle(title: string): Observable<ProdutoModel[]>{
    return this.afs.collection<ProdutoModel>('produtos', 
    ref => ref.orderBy('title').startAt(title).endAt(title+"\uf8ff"))
    .valueChanges();
  }
}
