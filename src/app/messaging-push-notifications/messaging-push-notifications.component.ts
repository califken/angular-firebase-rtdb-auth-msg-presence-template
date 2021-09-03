import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { mergeMap, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { MessagingService } from '../services/messaging.service';

@Component({
  selector: 'app-messaging-push-notifications',
  templateUrl: './messaging-push-notifications.component.html',
  styleUrls: ['./messaging-push-notifications.component.scss']
})
export class MessagingPushNotificationsComponent {
  constructor(private afMessaging: AngularFireMessaging, private db: AngularFireDatabase, public auth: AuthService, public messagingService: MessagingService) {



   }
  requestPermission() {
    this.afMessaging.requestToken
      .subscribe(
        (token) => { this.saveToken(token);},
        (error) => { console.error(error); },
      );
  }

  saveToken(token) {
    this.auth.getUserIDAsync().then(uid => {
      this.db.object(`users/${uid}/messagingToken`).set(token);
      this.db.list(`tokens`).push(token);
    });

  }

  deleteToken() {
    this.afMessaging.getToken
      .pipe(
        mergeMap(token => this.afMessaging.deleteToken(token)),
        switchMap(() => {
          return this.auth.getUserIDAsync().then(uid => this.db.object(`users/${uid}/messagingToken`).remove())
        })
      )
      .subscribe();
  }

}
