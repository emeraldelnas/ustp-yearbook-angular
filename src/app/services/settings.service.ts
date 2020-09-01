import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { OpenedDates } from '../models/openeddates';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {


  constructor(public afs: AngularFirestore) { }

  getOpenedDates() {

    return this.afs.collection('settings').doc('open').valueChanges().pipe(
      map((data: OpenedDates) => {
        return data;
      })
    )
  }

}
