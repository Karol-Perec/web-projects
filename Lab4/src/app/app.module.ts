import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RegisterComponent} from './register/register.component';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {TopBarComponent} from './top-bar/top-bar.component';
import {UserProfileInfoComponent} from './user-profile-info/user-profile-info.component';
import {UserWorkshopsInfoComponent} from './user-workshops-info/user-workshops-info.component';
import {UserPanelComponent} from './user-panel/user-panel.component';
import {WorkshopsService} from './workshops.service';
import {HttpClientModule} from '@angular/common/http';
import {WorkshopDetailsComponent} from './workshop-details/workshop-details.component';
import {WorkshopsListComponent} from './workshops-list/workshops-list.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    TopBarComponent,
    UserProfileInfoComponent,
    UserWorkshopsInfoComponent,
    UserPanelComponent,
    WorkshopDetailsComponent,
    WorkshopsListComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: '', component: RegisterComponent},
      {path: 'panel', component: UserPanelComponent},
      {path: 'profile', component: UserProfileInfoComponent},
      {path: 'workshops', component: WorkshopsListComponent},
      {path: 'workshops/:workshopId', component: WorkshopDetailsComponent},
      {path: 'summary', component: UserWorkshopsInfoComponent}
    ]),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [WorkshopsService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
