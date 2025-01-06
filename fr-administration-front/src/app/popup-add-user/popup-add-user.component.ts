import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiHelperService } from '../services/api-helper.service';

@Component({
  selector: 'app-popup-add-user',
  templateUrl: './popup-add-user.component.html',
  styleUrls: ['./popup-add-user.component.scss'],
  imports :[FormsModule]
})
export class PopupAddUserComponent {
  @Output() closePopup = new EventEmitter<void>();
  @Output() userAdded = new EventEmitter<any>();

  firstname: string = '';
  lastname: string = '';
  age: string = '';
  password: string='';
  isLoading: boolean = false;

  constructor(private api: ApiHelperService){}

  close() {
    this.closePopup.emit();
  }

  addUser() {
    if (this.firstname && this.lastname && this.age && this.password) {
      this.isLoading = true;

      this.api.post({endpoint:"/users",data: {firstname:this.firstname,lastname: this.lastname, age: this.age,password :this.password }})

      // Simuler un appel HTTP
      setTimeout(() => {
        this.userAdded.emit({
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.age,
        });
        this.isLoading = false;
        this.close();
      }, 2000);
    } else {
      alert('Veuillez remplir tous les champs.');
    }
  }
}
