import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent implements OnInit {
  @Input() message!: string;
  @Input() type!: "error" | "success" | "warning";
  @Output() toastClosed = new EventEmitter<void>();
  isActive: boolean = false;

  ngOnInit(): void {
    this.showToast();
  }

  showToast(): void {
    this.isActive = true;

    setTimeout(() => {
      this.isActive = false;
      setTimeout(() => {
        this.toastClosed.emit();
      }, 1000)
      
    }, 3000);
  }
}
