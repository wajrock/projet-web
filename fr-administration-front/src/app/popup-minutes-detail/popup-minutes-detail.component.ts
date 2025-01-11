import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MinutesData } from '../association-detail/association-detail.component';

@Component({
  selector: 'app-popup-minutes-detail',
  imports: [],
  templateUrl: './popup-minutes-detail.component.html',
  styleUrl: './popup-minutes-detail.component.scss'
})
export class PopupMinutesDetailComponent {
  @Input() minutesData!: MinutesData;
  @Output() closePopup = new EventEmitter<void>();

  close(): void{
    this.closePopup.emit()
  }
}
