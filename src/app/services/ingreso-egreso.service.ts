import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  urlBD = 'ingreso-egreso/desarrollo'

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) { }

  crearIngresoEgreso( ingresoEgreso: IngresoEgreso ){
    const uid = this.authService.user.uid;
    delete ingresoEgreso.uid;
    return this.firestore.doc(`${this.urlBD}/${uid}/ingreso-egreso`)
      .collection('items')
      .add({...ingresoEgreso});
  }

  initIngresoEgreso(uid: string){
    return this.firestore.collection(`${this.urlBD}/${uid}/ingreso-egreso/items`)
      .snapshotChanges()
      .pipe(
        map((data) => {
          return data.map((item) => {
            return {
              uid: item['payload']['doc']['id'],
              ...item['payload']['doc'].data() as any
            }
          })
        })
      )
      
  }

  deleteItems(uid: string){
    const uidUser = this.authService.user.uid;
    return this.firestore.doc(`${this.urlBD}/${uidUser}/ingreso-egreso/items/${uid}`).delete()
  }
}
