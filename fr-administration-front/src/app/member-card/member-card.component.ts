import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AssociationData } from '../associations-list/associations-list.component';
import { Router, RouterLink } from '@angular/router';
import { UserData } from '../users-list/users-list.component';
import { PopupComponent } from '../popup/popup.component';
import { PopupDeleteComponent } from '../popup-delete/popup-delete.component';

@Component({
  selector: 'app-member-card',
  imports: [RouterLink, PopupComponent, PopupDeleteComponent],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.scss'
})
export class MemberCardComponent {
  @Input() memberData!: UserData;
  @Input() page: string = "users";
  @Output() deleted = new EventEmitter<void>();
  @Output() userAdded = new EventEmitter<UserData>(); // Événement pour signaler l'ajout d'un utilisateur
  isHovered: boolean = false;
  showEditPopup: boolean = false; // État pour gérer le popup d'ajout

  constructor(private http: HttpClient, private router: Router) {}

  openPopup(): void {
    this.showEditPopup = true;
  }

  closePopup(): void {
    this.showEditPopup = false;
  }
}
