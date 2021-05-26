import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from "rxjs/operators";
import { AppState } from '../app.reducer';
import { User } from '../models/user.model';
import * as authActions from '../auth/state/auth.action';
import * as dashboardActions from '../dashboard/state/dashboard.actions';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  urlBD = 'ingreso-egreso/desarrollo'
  userSubscription?: Subscription;
  private _user: User;

  constructor(
    private angularFireAuth:AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store<AppState>,
    private router: Router
  ) { }

  get user(){
    return this._user;
  }

  initAuthListener() {

    this.angularFireAuth.authState.subscribe( fuser => {
      if ( fuser ) {
        // existe
        this.userSubscription = this.firestore.doc(`${this.urlBD}/${ fuser.uid }/usuario`).valueChanges()
          .subscribe( (firestoreUser: any) => {

            const user = User.fromFirebase( firestoreUser );
            this._user = user;
            this.store.dispatch( authActions.setUser({ user }) );
          })

      } else {
        // no existe
        if (this.userSubscription) {
          this.userSubscription.unsubscribe();
          this.store.dispatch( authActions.unSetUser() );
          this.store.dispatch( dashboardActions.unSetItems() )
          this._user = null;
        }
      }

    });

  }

  crearUsuario(userName: string, email: string, password: string){
    return this.angularFireAuth.createUserWithEmailAndPassword(email, password)
    .then( ({ user }) => {
      const newUser = new User( user.uid, userName, user.email );
      return this.firestore.doc(`${this.urlBD}/${ user.uid }/usuario`).set({ ...newUser });
    });
  }

  registrarUsuario(email: string, password:string){
    return this.angularFireAuth.signInWithEmailAndPassword(email, password)

      
  }

  logout(){
    this.router.navigate(['auth', 'login']);
    return this.angularFireAuth.signOut()
  }

  isAuth(){
    return this.angularFireAuth.authState.pipe(
      map( fbAuser => fbAuser !== null )
    )
  }
}
