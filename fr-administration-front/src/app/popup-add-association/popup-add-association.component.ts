import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiHelperService } from '../services/api-helper.service';
import { AssociationData } from '../associations-list/associations-list.component';
import { CommonModule } from '@angular/common';
import { UserData } from '../users-list/users-list.component';

interface NewAssociation {
  name: string | null;
}
@Component({
  selector: 'app-popup-add-association',
  templateUrl: './popup-add-association.component.html',
  styleUrls: ['./popup-add-association.component.scss'],
  imports: [FormsModule, CommonModule]
})
export class PopupAddAssociationComponent {
  @Output() closePopup = new EventEmitter<void>();
  @Output() associationAdded = new EventEmitter<void>();

  newAssociation: NewAssociation = {name: null};
  currentUser:UserData = JSON.parse(localStorage.getItem("currentUser")!);

  isLoading: boolean = false;

  constructor(private api: ApiHelperService) {}

  // Ferme la fenêtre popup
  close() {
    this.closePopup.emit();
  }

  // Ajoute une nouvelle association
  addAssociation() {
    if (this.newAssociation.name && this.currentUser) {

      this.api.post({ endpoint: "/associations", data: {idUsers: [this.currentUser.id], name: this.newAssociation.name, idCreator: this.currentUser.id}}).subscribe({
        next: (response) => {
          if (response.ok && response.status === 201) {
            this.associationAdded.emit(); 
            this.close(); 
          }
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout de l\'association:', error);
          this.isLoading = false;
        }
      });
    }
  }
}
