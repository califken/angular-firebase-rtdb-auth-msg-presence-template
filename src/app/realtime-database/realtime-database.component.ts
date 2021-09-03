import { Component, ElementRef, ViewChild } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { MessagingService } from '../services/messaging.service';

@Component({
  selector: 'app-realtime-database',
  templateUrl: './realtime-database.component.html',
  styleUrls: ['./realtime-database.component.scss']
})
export class RealtimeDatabaseComponent {
  @ViewChild('newitem') newItemElemRef: ElementRef;
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  constructor(db: AngularFireDatabase, public authService: AuthService, public messagingService: MessagingService) {
    this.itemsRef = db.list('messages');
    // Use snapshotChanges().map() to store the key
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
      this.messagingService.pushContentNotifications(`${user.displayName} added ${newName} to Angular Fire RTDB`);
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
