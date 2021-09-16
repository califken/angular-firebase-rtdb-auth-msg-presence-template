import { Injectable } from '@angular/core';

import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireMessaging } from '@angular/fire/messaging';
// import { FirebaseAuthenticationService } from '../../firebase-authentication/firebase-authentication.service';
import { mergeMapTo } from 'rxjs/operators';
import { mergeMap } from 'rxjs/operators';

import { Observable, of } from 'rxjs';
import { switchMap, tap, map, pluck, filter } from 'rxjs/operators';
// import { AbstractIfState } from '@clr/angular/forms/common/if-control-state/abstract-if-state';
// import { User } from '../../interfaces';
import { AuthService } from './auth.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

export interface Item {
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class MessagingService {
  user$;
  auth;
  user;
  notifications = false;
  tokens;
  cmTo: string;
  cmSubject: string;
  cmMessage: string;
  cmIcon: string;
  cmResponse;

  users;

  tokensObs;
  tokens$;
  constructor(
    public db: AngularFireDatabase,
    private afMessaging: AngularFireMessaging,
    private authService: AuthService
  ) {}

  pushContentNotifications(content: string) {
    console.log('test');
    this.tokens$ = this.db.list('tokens').valueChanges();

      this.tokens$.subscribe((tokens) => {
        console.log(tokens);
        tokens.forEach((token) => {
          this.pushNotification(token, 'New Content Alert', content);
        });
      });
      this.tokens$.unsubscribe();
  }

  pushNotification(token: any, title: string, content: string) {
    console.log('push notification', token);
    var key =
      'AAAAjFq_3LQ:APA91bHiF5y5fvPHtaTeBlk_ae5MWm1vV04H8ItZVbp9GUWz8S1d0s8nSifdKrhkV-amhbS_Oc0T3KdlWfCDS8fi8xraWCpyzuaRkOJlNR7QyFthQXoBaSZvbNgB5OpFKXvZay6mmQ44';
    var to = token;
    var notification = {
      title: title,
      body: content,
      icon: '/assets/angular.png',
      click_action:
        'https://angular-firebase-rtdb-auth-msg.web.app/realtime-database',
    };

    fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST',
      headers: {
        Authorization: 'key=' + key,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        notification: notification,
        to: to,
      }),
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

}
