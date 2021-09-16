import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessagingPushNotificationsComponent } from './messaging-push-notifications/messaging-push-notifications.component';
import { PresenceComponent } from './presence/presence.component';
import { RealtimeDatabaseComponent } from './realtime-database/realtime-database.component';
import { UserAuthenticationComponent } from './user-authentication/user-authentication.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {path: 'user-authentication', component: UserAuthenticationComponent},
  {path: 'realtime-database', component: RealtimeDatabaseComponent},
  {path: 'messaging-push-notifications', component: MessagingPushNotificationsComponent},
  {path:'presence', component: PresenceComponent},
  {path:'**', component: WelcomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],




  exports: [RouterModule]
})
export class AppRoutingModule { }
