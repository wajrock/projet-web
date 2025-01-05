import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AssociationData } from '../associations-list/associations-list.component';
import { UserData } from '../users-list/users-list.component';
import { MatTableModule } from '@angular/material/table';
import { UserCardComponent } from '../user-card/user-card.component';

export interface MinutesData {
  idMinute: number;
  content: string;
  date: string;
  voters: UserData[];
}

@Component({
  selector: 'app-association-detail',
  imports: [UserCardComponent],
  templateUrl: './association-detail.component.html',
  styleUrl: './association-detail.component.scss',
})
export class AssociationDetailComponent {
  idAssociation!: number;
  associationDetail!: AssociationData;
  associationMembers!: UserData[];
  associationMinutes!: MinutesData[];
  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.idAssociation = +this.route.snapshot.params['id'];
    this.fetchUserDetail();
    console.log(this.associationDetail.members);
    
  }

  fetchUserDetail(): void {
    this.http
      .get<AssociationData>(`http://localhost:3000/associations/${this.idAssociation}`, {
        observe: 'response',
      })
      .subscribe({
        next: (response) => {
          if (response.ok && response.body) {
            this.associationDetail = response.body;
            console.log(this.associationDetail);
          }
        },
        error: (error) => console.log('error'),
      });

      this.http
      .get<UserData[]>(`http://localhost:3000/associations/${this.idAssociation}/members`, {
        observe: 'response',
      })
      .subscribe({
        next: (response) => {
          if (response.ok && response.body) {
            console.log(response.body);
            
            this.associationMembers = response.body;
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
}
