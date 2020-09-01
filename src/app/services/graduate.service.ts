import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Graduate } from '../models/graduate';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GraduateService {

  graduatesCollection: AngularFirestoreCollection<Graduate>;
  graduatesValue: Observable<Graduate[]>;
  takenTimeSlots: Observable<string[]>;

  graduatesSnapshot: any;

  constructor(public afs: AngularFirestore) {
    // this.initGraduateService();
  }

  initGraduateService(): void {
    this.graduatesCollection = this.afs.collection('graduates');

    this.graduatesValue = this.graduatesCollection.valueChanges();

    this.graduatesSnapshot = this.graduatesCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Graduate;
        const id = a.payload.doc.id;

        return {id, ...data};
      }))
    );
  }

  getTimeSlots(date: string) {
    return this.afs.collection('graduates', ref => {
      return ref.where('shoot_date', '==', date);
    }).valueChanges().pipe(
      map((graduates: Graduate[]) => {
        return graduates.map((graduate: Graduate) => {
          return graduate.shoot_time;
        })
      })
    )
  }

  getGraduatesByApproved(status: boolean) {
    return this.afs.collection('graduates', ref => {
      return ref.where('approved', '==', status);
    }).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Graduate;
        const id = a.payload.doc.id;

        return {id, ...data};
      }))
    )
  }

  getGraduate(docId: string) {
    return this.afs.doc('graduates/' + docId).valueChanges();
  }

  addGraduate(graduate: Graduate) {
    return this.afs.collection('graduates').add(graduate);
  }

  approveGraduate(docId: string, status: boolean, data?: Graduate) {

    let updatedFields: any = {
      "approved": false
    }

    if(status) {
      updatedFields = {
        "initial_payment": data.initial_payment,
        "balance": data.balance,
        "approved": true
      }
    }

    return this.afs.doc('graduates/' + docId).update(updatedFields);
  }


  disapproveGraduate(docId: string) {

    return this.afs.doc('graduates/' + docId).delete();
  }


}
