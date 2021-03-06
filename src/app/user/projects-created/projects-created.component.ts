import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProjectDetailsComponent } from 'src/app/project-details/project-details.component';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { ProjectModel } from 'src/app/core/project.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from 'src/app/core/user.service';
import { UserModel } from 'src/app/core/user.model';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-projects-created',
  templateUrl: './projects-created.component.html',
  styleUrls: ['./projects-created.component.css']
})
export class ProjectsCreatedComponent implements OnInit {
  public projectsRef: AngularFireList<ProjectModel>;
  public projects$: Observable<ProjectModel[]>;
  public projects: ProjectModel[];
  public user: UserModel;

  constructor(
    db: AngularFireDatabase,
    public userService: UserService,
    public authService: AuthService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.projectsRef = db.list('/projects');
    this.projects$ = this.projectsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
    this.projects$.subscribe(result => {
      this.projects = result.filter(item => item.ownerEmail == this.user.email);
    });
  }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.user = data;
      }
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(ProjectDetailsComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createProject(result);
      }
    });
  }

  createProject(project: ProjectModel) {
    project.ownerEmail = this.user.email;
    this.projectsRef.push(project);
    this.projects.push(project);
  }
}
