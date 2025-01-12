import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AssociationData } from '../associations-list/associations-list.component';
import { RouterLink } from '@angular/router';
import { UserData } from '../users-list/users-list.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-association-card',
  imports: [RouterLink, CommonModule],
  templateUrl: './association-card.component.html',
  styleUrl: './association-card.component.scss',
})
export class AssociationCardComponent implements OnInit {
  @Input() association!: AssociationData;
  @Output() deleted = new EventEmitter<void>();
  loggedUserIsPresident: boolean = false;

  ngOnInit(): void {
    const currentUser: UserData = JSON.parse(
      localStorage.getItem('currentUser')!
    );
    if (this.association){
      this.loggedUserIsPresident = currentUser.id === this.association.members.find((member) => member.role === 'president')?.id
    }
  }
}
