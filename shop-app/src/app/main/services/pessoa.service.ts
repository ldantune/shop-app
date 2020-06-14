import { PessoaModel } from '../models/pessoa-model';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  private pessoasCollection: AngularFirestoreCollection<PessoaModel> = this.afs.collection('pessoas');

  constructor(private afs: AngularFirestore) { }

  getPessoas(): Observable<PessoaModel[]> {
    return this.pessoasCollection.valueChanges();
  }

  addPessoa(p: PessoaModel){
    p.id = this.afs.createId();
    return this.pessoasCollection.doc(p.id).set(p);
    //return this.productsCollection.add(p);
  }

  deletePessoa(p: PessoaModel){
    return this.pessoasCollection.doc(p.id).delete();
  }

  updatePessoa(p: PessoaModel){
    return this.pessoasCollection.doc(p.id).set(p);
  }

  searchByName(nome: string): Observable<PessoaModel[]>{
    return this.afs.collection<PessoaModel>('pessoas', 
    ref => ref.orderBy('nome').startAt(nome).endAt(nome+"\uf8ff"))
    .valueChanges();
  }
}
