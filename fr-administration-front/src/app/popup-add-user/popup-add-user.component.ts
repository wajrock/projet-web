import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiHelperService } from '../services/api-helper.service';
import { UserUpdate } from '../popup-update-profile/popup-update-profile.component';
import { __values } from 'tslib';

@Component({
  selector: 'app-popup-add-user',
  templateUrl: './popup-add-user.component.html',
  styleUrls: ['./popup-add-user.component.scss'],
  imports :[FormsModule]
})


export class PopupAddUserComponent {
  @Output() closePopup = new EventEmitter<void>();
  @Output() userAdded = new EventEmitter<void>();
  newUser: UserUpdate= {firstname: undefined,lastname: undefined,age:undefined,password:undefined};


  isLoading: boolean = false;

  constructor(private api: ApiHelperService){}

  close() {
    this.closePopup.emit();
  }

  addUser() {
    if (Object.values(this.newUser).every(value =>value!==undefined)) {
      this.isLoading = true;

      this.api.post({endpoint:"/users",data: this.newUser}).subscribe({
        next: (response) => {
          console.log(response);
          
            if (response.ok && response.status === 201){
              this.userAdded.emit();
              this.close()
            }
            
        },
      })

      
    }
  }
}
