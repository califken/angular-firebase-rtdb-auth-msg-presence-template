import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { PresenceService } from '../services/presence.service';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-presence',
  templateUrl: './presence.component.html',
  styleUrls: ['./presence.component.scss']
})
export class PresenceComponent implements OnInit {
  myPresence$;
  allOnlineUsers$;
  constructor(public presenceService: PresenceService, public auth: AuthService, public util: UtilService ) {
    this.myPresence$ = presenceService.getMyPresence();
    this.allOnlineUsers$ = presenceService.getAllOnlineUsers();
  }

  ngOnInit(): void {
  }

}
