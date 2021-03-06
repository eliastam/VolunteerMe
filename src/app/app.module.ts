import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { rootRouterConfig } from './app.routes';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule} from '@angular/fire/database';

// User
import { UserResolver } from './user/user.resolver';

// Core
import { AuthGuard } from './core/auth.guard'
import { AuthService } from './core/auth.service';
import { UserService } from './core/user.service';

// Components
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/modules/material/material.module';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';

// font-awesome 
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditDialogComponent } from './user/edit-dialog/edit-dialog.component';
import { ProfileComponent } from './user/profile/profile.component';
import { ProjectsCreatedComponent } from './user/projects-created/projects-created.component';
import { ProjectsSignedUpForComponent } from './user/projects-signed-up-for/projects-signed-up-for.component';
import { ProjectCardComponent } from './material/project-card/project-card.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { MapComponent } from './user/map/map.component'

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MaterialModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: false }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    ProjectListComponent,
    ProjectDetailsComponent,
    LoginComponent,
    UserComponent,
    RegisterComponent,
    EditDialogComponent,
    ProfileComponent,
    ProjectsCreatedComponent,
    ProjectsSignedUpForComponent,
    ProjectCardComponent,
    DeleteDialogComponent,
    MapComponent
  ],
  providers: [AuthService, UserService, UserResolver, AuthGuard],
  bootstrap: [AppComponent],
  entryComponents: [
    EditDialogComponent,
    ProjectDetailsComponent,
    DeleteDialogComponent
  ]
})

export class AppModule { }