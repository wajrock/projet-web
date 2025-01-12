import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AssociationData } from '../associations-list/associations-list.component';
import { RouterLink } from '@angular/router';
import { UserData } from '../users-list/users-list.component';

@Component({
  selector: 'app-user-card',
  imports: [RouterLink],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent implements OnInit {
  @Input() user!: UserData;
  @Input() page: string = 'users';
  associations!: AssociationData[];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchUserAssociations();
  }

  fetchUserAssociations(): void {
    if (this.user){
      this.http
      .get<AssociationData[]>(
        `http://localhost:3000/associations/user/${this.user.id}`,
        {
          observe: 'response',
        }
      )
      .subscribe({
        next: (response) => {
          if (response.ok && response.body) {
            this.associations = response.body;
          }
        },
        error: (error) => console.log('error'),
      });
    }
   
  }
}
