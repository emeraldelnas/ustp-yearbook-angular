import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { OpenedDates } from '../models/openeddates';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {


  constructor(public afs: AngularFirestore) { }

  // using firebase server's timestamp
  testing() {
    return this.afs.collection('settings').add({
      testDate: firestore.Timestamp.now()
    });
  }

  getOpenedDates() {

    return this.afs.collection('settings').doc('open').valueChanges().pipe(
      map((data: OpenedDates) => {
        return data;
      })
    )
  }

  updateOpenedDates(openedDates: OpenedDates) {
    return this.afs.doc('settings/open').update(openedDates);
  }

}
