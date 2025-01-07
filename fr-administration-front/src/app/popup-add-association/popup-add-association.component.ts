import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiHelperService } from '../services/api-helper.service';
import { AssociationData } from '../associations-list/associations-list.component';

@Component({
  selector: 'app-popup-add-association',
  templateUrl: './popup-add-association.component.html',
  styleUrls: ['./popup-add-association.component.scss'],
  imports: [FormsModule]
})
export class PopupAddAssociationComponent {
  @Output() closePopup = new EventEmitter<void>();
  @Output() associationAdded = new EventEmitter<void>();

  newAssociation: AssociationData = { id: 0, name: '', logo: '', members: [] };

  isLoading: boolean = false;

  constructor(private api: ApiHelperService) {}

  // Ferme la fenêtre popup
  close() {
    this.closePopup.emit();
  }

  // Ajoute une nouvelle association
  addAssociation() {
    if (this.newAssociation.name && this.newAssociation.logo) {
      this.isLoading = true;

      this.api.post({ endpoint: "/associations", data: this.newAssociation }).subscribe({
        next: (response) => {
          console.log(response);

          // Vérifie si la réponse est positive et si l'association a été créée
          if (response.ok && response.status === 201) {
            this.associationAdded.emit();  // Émet l'événement pour signaler l'ajout
            this.close();  // Ferme la popup
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
