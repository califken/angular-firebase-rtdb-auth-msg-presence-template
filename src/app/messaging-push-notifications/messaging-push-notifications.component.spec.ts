import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagingPushNotificationsComponent } from './messaging-push-notifications.component';

describe('MessagingPushNotificationsComponent', () => {
  let component: MessagingPushNotificationsComponent;
  let fixture: ComponentFixture<MessagingPushNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessagingPushNotificationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagingPushNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
