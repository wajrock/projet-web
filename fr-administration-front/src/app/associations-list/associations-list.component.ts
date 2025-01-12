import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { AssociationCardComponent } from '../association-card/association-card.component';
import { PopupAddAssociationComponent } from '../popup-add-association/popup-add-association.component';
import { PopupComponent } from '../popup/popup.component';
import { FormsModule } from '@angular/forms';
import { UserData } from '../users-list/users-list.component';

export interface AssociationData {
  id: number;
  name: string;
  members: UserData[];
}

@Component({
  selector: 'app-associations-list',
  standalone: true,
  imports: [
    MatTableModule,
    RouterLink,
    AssociationCardComponent,
    PopupAddAssociationComponent,
    PopupComponent,
    FormsModule
  ],
  templateUrl: './associations-list.component.html',
  styleUrls: ['./associations-list.component.scss'],
})
export class AssociationsListComponent implements OnInit {
  associationsList: AssociationData[] = [];
  associationsListFiltered: AssociationData[] = [];
  showPopup: boolean = false;

  constructor(
    private http: HttpClient,
  ) {}

  ngOnInit(): void {
    this.fetchAssociations();
  }


  // Ouvre la popup pour ajouter une association
  openPopup(): void {
    this.showPopup = true;
  }

  // Ferme la popup
  closePopup(): void {
    this.showPopup = false;
  }

  // Appelé lorsque l'utilisateur ajoute une association
  onAssociationAdded(): void {
    console.log('Association added successfully.');
    this.fetchAssociations();
  }

  // Récupère les associations depuis le serveur
  fetchAssociations(): void {
    this.http
      .get('http://localhost:3000/associations', { observe: 'response' })
      .subscribe({
        next: (response) => {
          this.associationsList = response.body as AssociationData[];
          this.associationsListFiltered = response.body as AssociationData[];
        },
        error: (error) =>
          console.error('Error fetching associations:', error),
      });
  }

  // Filtre les associations en fonction de la recherche
  search(event: Event): void {
    const value = (event.target as HTMLInputElement).value.toLowerCase();
    this.associationsListFiltered = this.associationsList.filter(
      (association) =>
        association.name.toLowerCase().includes(value) ||
        association.id.toString() === value
    );
  }

  // Ajoute une nouvelle association
  addAssociation(): void {
    const newAssociation = {
      name: 'New Association',
      logo: 'logo.png',
      members: [],
    };

    this.http
      .post('http://localhost:3000/associations', newAssociation, {
        observe: 'response',
      })
      .subscribe({
        next: (response) => {
          if (response.ok) {
            this.fetchAssociations();
          }
        },
        error: (error) =>
          console.error('Error adding association:', error),
      });
  }
}
