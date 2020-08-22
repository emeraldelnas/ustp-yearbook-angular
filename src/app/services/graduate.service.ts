import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Graduate } from '../models/graduate';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GraduateService {

  graduatesCollection: AngularFirestoreCollection<Graduate>;
  graduatesValue: Observable<Graduate[]>;

  graduatesSnapshot: any;

  constructor(public afs: AngularFirestore) {
    this.graduatesCollection = this.afs.collection('graduates');

    this.graduatesValue = this.graduatesCollection.valueChanges();

    this.graduatesSnapshot = this.graduatesCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Graduate;
        const id = a.payload.doc.id;

        return {id, ...data}
      }))
    );



  }


  addGraduate(graduate: Graduate) {
    this.graduatesCollection.add(graduate);
  }
}
