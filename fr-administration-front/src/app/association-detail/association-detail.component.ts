import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AssociationData } from '../associations-list/associations-list.component';
import { UserData } from '../users-list/users-list.component';
import { MatTableModule } from '@angular/material/table';
import { UserCardComponent } from '../user-card/user-card.component';
import { MemberCardComponent } from '../member-card/member-card.component';
import { PopupUpdateAssociationComponent } from '../popup-update-association/popup-update-association.component';
import { PopupComponent } from '../popup/popup.component';
import { PopupDeleteComponent } from '../popup-delete/popup-delete.component';
import { MinutesCardComponent } from '../minutes-card/minutes-card.component';

export interface MinutesData {
  idMinute: number;
  content: string;
  date: string;
  voters: UserData[];
}

@Component({
  selector: 'app-association-detail',
  imports: [MemberCardComponent,MinutesCardComponent, PopupUpdateAssociationComponent, PopupComponent, PopupDeleteComponent],
  templateUrl: './association-detail.component.html',
  styleUrl: './association-detail.component.scss',
})
export class AssociationDetailComponent implements OnInit {
  idAssociation!: number;
  associationDetail!: AssociationData;
  associationMinutes!: MinutesData[];
  showPopup: "delete" | "edit" | null = null;
  currentUser: UserData = JSON.parse(localStorage.getItem('currentUser')!);
  loggedUserIsPresident: boolean = false;
  constructor(private route: ActivatedRoute, private http: HttpClient, private router:Router) {}

  
  ngOnInit() {
    this.idAssociation = +this.route.snapshot.params['id'];
    this.fetchAssociationDetail();
  }

  fetchAssociationDetail(): void {
    this.http
      .get<AssociationData>(`http://localhost:3000/associations/${this.idAssociation}`, {
        observe: 'response',
      })
      .subscribe({
        next: (response) => {
          if (response.ok && response.body) {
            this.associationDetail = response.body;
            this.loggedUserIsPresident = this.associationDetail.members.find((member) => member.id === this.currentUser.id)?.role === "president";
          }
        },
        error: (error) => console.log('error'),
      });

      this.http
      .get<MinutesData[]>(`http://localhost:3000/associations/${this.idAssociation}/minutes`, {
        observe: 'response',
      })
      .subscribe({
        next: (response) => {
          if (response.ok && response.body) {
            this.associationMinutes = response.body
          }
        },
        error: (error) => console.log('error'),
      });
  }

  openPopup(type: "edit" | "delete"): void {
    this.showPopup = type;
  }

  closePopup(): void {
    this.showPopup = null
  }

  removeAssociation(): void {
    this.http
      .delete(`http://localhost:3000/associations/${this.associationDetail.id}`, {
        observe: 'response',
      })
      .subscribe({
        next: (response) => {
          if (response.ok) {
            this.router.navigateByUrl("/associations")
          }
        },
        error: (error) =>
          console.error('Error removing association:', error),
      });
  }
}
