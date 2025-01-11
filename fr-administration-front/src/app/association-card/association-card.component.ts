import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AssociationData } from '../associations-list/associations-list.component';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-association-card',
  imports: [RouterLink],
  templateUrl: './association-card.component.html',
  styleUrl: './association-card.component.scss',
})
export class AssociationCardComponent {
  @Input() association!: AssociationData;
  @Output() deleted = new EventEmitter<void>();
}
