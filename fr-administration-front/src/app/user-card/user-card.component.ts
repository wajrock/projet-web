import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AssociationData } from '../associations-list/associations-list.component';
import { Router, RouterLink } from '@angular/router';
import { UserData } from '../users-list/users-list.component';
import { PopupComponent } from '../popup/popup.component';
import { PopupDeleteComponent } from '../popup-delete/popup-delete.component';

@Component({
  selector: 'app-user-card',
  imports: [RouterLink, PopupComponent, PopupDeleteComponent],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent implements OnInit{
  @Input() user!: UserData;
  @Input() page: string = "users";
  @Output() deleted = new EventEmitter<void>();
  associations!: AssociationData[];
  isHovered: boolean = false;
  showPopup: boolean = false;

  constructor (private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
      this.fetchUserAssociations();
  }

  fetchUserAssociations(): void{
    this.http
      .get<AssociationData[]>(`http://localhost:3000/associations/user/${this.user.id}`, {
        observe: 'response',
      })
      .subscribe({
        next: (response) => {
          if (response.ok && response.body) {
            this.associations = response.body;
          }
        },
        error: (error) => console.log('error'),
      });
  }

  openPopup(event: Event): void{
    event.stopPropagation();
    this.showPopup = true;
  }

  closePopup(): void{
    this.showPopup = false;
  }

  onClick(event: MouseEvent): void {
    this.router.navigateByUrl(`/users/${this.user.id}`)
  }

  isDeleted(): void{
    this.deleted.emit();
  }
}
