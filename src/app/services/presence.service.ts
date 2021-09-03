import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase/app';
import { tap, map, switchMap, first } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {
  myPresence;
  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) {
    this.updateOnUser().subscribe();
    this.updateOnDisconnect().subscribe();
    this.updateOnAway();
    this.myPresence = this.getMyPresence();
  }

  getPresence(uid: string) {
    return this.db.object(`status/${uid}`).valueChanges();
  }

  getMyPresence() {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        return this.getPresence(user.uid)
      })
    );
  }

  getUser() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  getAllOnlineUsers() {
    return this.db.list('status').valueChanges();
  }

  async setPresence(status: string) {
    const user = await this.getUser();
    if (user) {
      return this.db.object(`status/${user.uid}`).update({ status, timestamp: this.timestamp, displayName: user.displayName, photoURL: user.photoURL });
    }
  }

  get timestamp() {
    return Date.now()
  }

  updateOnUser() {
      const connection = this.db.object('.info/connected').valueChanges().pipe(
        map(connected => connected ? 'online' : 'offline')
      );

      return this.afAuth.authState.pipe(
        switchMap(user =>  user ? connection : of('offline')),
        tap(status => this.setPresence(status))
      );
  }


  // User navigates to a new tab, case 3
  updateOnAway() {
    document.onvisibilitychange = (e) => {

      if (document.visibilityState === 'hidden') {
        this.setPresence('away');
      } else {
        this.setPresence('online');
      }
    };
  }

  async signOut() {
    await this.setPresence('offline');
    await this.afAuth.signOut();
  }

  // User closes the app, case 2 and 5
  updateOnDisconnect() {
    return this.afAuth.authState.pipe(
      tap(user => {
        if (user) {
          this.db.object(`status/${user.uid}`).query.ref.onDisconnect()
            .update({
              status: 'offline',
              timestamp: this.timestamp
          });
        }
      })
    );

  }


}
