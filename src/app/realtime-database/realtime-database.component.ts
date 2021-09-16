import { Component, ElementRef, ViewChild, HostBinding } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { MessagingService } from '../services/messaging.service';

import { trigger, transition, animate, style, query, stagger } from '@angular/animations';
@Component({
  selector: 'app-realtime-database',
  templateUrl: './realtime-database.component.html',
  styleUrls: ['./realtime-database.component.scss'],
  animations: [
    trigger('pageAnimations', [
      transition(':enter', [
        query('div, li, .item', [
          style({opacity: 0, transform: 'translateY(-100px)'}),
          stagger(30, [
            animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'none' }))
          ])
        ])
      ])
    ]),
    trigger('filterAnimation', [
      transition(':enter, * => 0, * => -1', []),
      transition(':increment', [
        query(':enter', [
          style({ opacity: 0, width: '0px' }),
          stagger(50, [
            animate('300ms ease-out', style({ opacity: 1, width: '*' })),
          ]),
        ], { optional: true })
      ]),
      transition(':decrement', [
        query(':leave', [
          stagger(50, [
            animate('300ms ease-out', style({ opacity: 0, width: '0px' })),
          ]),
        ])
      ])
    ])
  ]
})
export class RealtimeDatabaseComponent {
  @HostBinding('@pageAnimations')
  public animatePage = true;
  @ViewChild('newitem') newItemElemRef: ElementRef;
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  constructor(db: AngularFireDatabase, public authService: AuthService, public messagingService: MessagingService) {
    this.itemsRef = db.list('messages');
    this.items = this.itemsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }
  addItem(newName: string) {
    this.authService.getUserAsync().then(user => {
      this.itemsRef.push({
        text: newName,
        authorName: user.displayName,
        authorPhoto: user.photoURL,
        authorID: user.uid
      });
      this.newItemElemRef.nativeElement.value = '';
      if (user['messagingToken']) {
        this.messagingService.pushNotification(user['messagingToken'],'Message from Angular Firebase! :)',`${user.displayName} added ${newName} to Angular Fire RTDB`);
      }
    })
  }
  updateItem(key: string, newText: string) {
    this.itemsRef.update(key, { text: newText });
  }
  deleteItem(key: string) {
    this.itemsRef.remove(key);
  }
  deleteEverything() {
    this.itemsRef.remove();
  }
}
