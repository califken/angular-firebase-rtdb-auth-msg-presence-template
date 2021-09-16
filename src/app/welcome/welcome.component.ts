import { Component, HostBinding, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

import { trigger, transition, animate, style, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  animations: [
    trigger('pageAnimations', [
      transition(':enter', [
        query('div, li', [
          style({opacity: 0, transform: 'translateY(-100px)'}),
          stagger(30, [
            animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', style({ opacity: 1, transform: 'none' }))
          ])
        ])
      ])
    ])
  ]
})
export class WelcomeComponent implements OnInit {
  @HostBinding('@pageAnimations')
  public animatePage = true;
  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

}
