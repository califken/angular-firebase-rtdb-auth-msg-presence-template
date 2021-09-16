import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireMessagingModule } from '@angular/fire/messaging';

import { environment } from 'src/environments/environment';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PresenceComponent } from './presence/presence.component';
import { UserAuthenticationComponent } from './user-authentication/user-authentication.component';
import { RealtimeDatabaseComponent } from './realtime-database/realtime-database.component';
import { MessagingPushNotificationsComponent } from './messaging-push-notifications/messaging-push-notifications.component';
import { MessagingService } from './services/messaging.service';
import { LoadingComponent } from './loading/loading.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WelcomeComponent,
    PresenceComponent,
    UserAuthenticationComponent,
    RealtimeDatabaseComponent,
    MessagingPushNotificationsComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireMessagingModule
  ],
  providers: [MessagingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
