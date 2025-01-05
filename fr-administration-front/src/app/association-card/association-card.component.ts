import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AssociationData } from '../associations-list/associations-list.component';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PopupComponent } from '../popup/popup.component';
import { PopupDeleteComponent } from '../popup-delete/popup-delete.component';
@Component({
  selector: 'app-association-card',
  imports: [RouterLink, PopupComponent,PopupDeleteComponent],
  templateUrl: './association-card.component.html',
  styleUrl: './association-card.component.scss',
})
export class AssociationCardComponent {
  @Input() association!: AssociationData;
  @Output() deleted = new EventEmitter<void>();
  associations!: AssociationData[];
  isHovered: boolean = false;
  showPopup: boolean = false;

  constructor (private http: HttpClient, private router: Router) {}
  
  openPopup(event: Event): void{
    event.stopPropagation();
    this.showPopup = true;
  }

  closePopup(): void{
    this.showPopup = false;
  }

  onClick(event: MouseEvent): void {
    this.router.navigateByUrl(`/users/${this.association.id}`)
  }

  isDeleted(): void{
    this.closePopup();
    this.deleted.emit();
  }
}
