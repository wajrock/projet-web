import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface NewComposition {
  date: string | null;
  poids: number | null;
  masseMusculaire: number | null;
  masseGrasse: number | null;
  masseMaigre: number | null;
  masseHydrique: number | null;
  legMuscleScore: number | null;
}

@Component({
  selector: 'app-popup-delete',
  imports: [FormsModule, CommonModule],
  templateUrl: './popup-delete.component.html',
  styleUrl: './popup-delete.component.scss',
})
export class PopupDeleteComponent {
  @Input() type!: "user" | "association";
  @Output() removeId = new EventEmitter<void>();
  @Output() closePopup = new EventEmitter<void>();
  isLoading:boolean = false;

  constructor(private http: HttpClient) {}

  close() {
    this.closePopup.emit();
  }

  deleteId(): void{
    this.removeId.emit()
  }
}
