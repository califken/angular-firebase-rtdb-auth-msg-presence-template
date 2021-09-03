import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

import { Observable, of } from 'rxjs';
import { switchMap, first, map } from 'rxjs/operators';

import { User } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // the user$ observable is used by all the other features
  // to check if the user is authenticated or not
  // and to get user details, like the user id, name and photo
  public user$: Observable<User>;

  // inject Angular Fire Auth and Database classes
  constructor(private auth: AngularFireAuth, private db: AngularFireDatabase) {

    // for our user$ observable, let's take the state of authentication
    // and transform it via a pipe
    this.user$ = this.auth.authState.pipe(

      // using the switchMap operator, we can extract a value from
      // the outer observable (the auth state), and pass it to
      // some other observable. In this case, the value from
      // authState, passing it to the inner observable as "user"
      switchMap(user => {

        // if the user is not null, they are logged in!
        if (user) {

          // watch the data located at users/user.uid
          // (observe) returning an observable
          return this.db.object(`users/${user.uid}`).valueChanges();

        // else, they are not logged in
        } else {

          // no data for you
          return of(null);
        }
      })
    );
  }

  /**
   * Helper function to get the user object as a promise
   * so elsewhere in the app, we can getUserAsync().then(user=>...)
   * to have access to logged in user id, name, etc..
   * @returns Promise
   */
  async getUserAsync() {
    const user = await this.auth.authState.pipe(first()).toPromise();
    return user;
  }

  async getUserIDAsync() {
    const user = await this.auth.authState.pipe(first()).toPromise();
    return user.uid;
  }

  async googleSignin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  async signOut() {
    await this.auth.signOut();
  }

  private updateUserData(user: User) {
    const userRef = this.db.object(`users/${user.uid}`);
    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };
    return userRef.update(data);
  }

}
