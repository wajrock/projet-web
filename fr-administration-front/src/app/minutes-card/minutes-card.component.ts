import { Component, Input } from '@angular/core';
import { MinutesData } from '../association-detail/association-detail.component';
import { PopupComponent } from '../popup/popup.component';
import { PopupMinutesDetailComponent } from '../popup-minutes-detail/popup-minutes-detail.component';

@Component({
  selector: 'app-minutes-card',
  imports: [PopupComponent, PopupMinutesDetailComponent],
  templateUrl: './minutes-card.component.html',
  styleUrl: './minutes-card.component.scss'
})
export class MinutesCardComponent {
  @Input() minutesData!: MinutesData;
  showPopupDetail: boolean = false;

  openPopup(): void{
    this.showPopupDetail = true;
  }

  closePopup(): void{
    this.showPopupDetail = false;
  }
}
