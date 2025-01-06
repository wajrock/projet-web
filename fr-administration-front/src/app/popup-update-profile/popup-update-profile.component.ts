import { Component, EventEmitter, Output } from '@angular/core';
import { UserData } from '../users-list/users-list.component';
import { FormsModule } from '@angular/forms';
import { ApiHelperService } from '../services/api-helper.service';


export interface UserUpdate {
  firstname: string | undefined,
  lastname: string | undefined,
  age?: number | undefined, 
  password: string | undefined,
}
@Component({
  selector: 'app-popup-update-profile',
  imports: [FormsModule],
  templateUrl: './popup-update-profile.component.html',
  styleUrl: './popup-update-profile.component.scss'
})
export class PopupUpdateProfileComponent {
  isLoading: boolean = false;
  currentUserDetail: UserData = JSON.parse(localStorage.getItem('currentUser')!);
  newUserDetail: UserUpdate = {
    firstname: undefined,
    lastname: undefined,
    password: undefined
    
  };
  @Output() updateProfile = new EventEmitter<void>();
  @Output() closePopup = new EventEmitter<void>();

  constructor(private api:ApiHelperService) {};
 

  close() {
    this.closePopup.emit();
  }

  update(): void{
    this.updateProfile.emit()
    this.api.put({endpoint: `/users/${this.currentUserDetail.id}`, data: this.newUserDetail}).subscribe(
      {
        next: (response) => {
          if (response.ok && response.status === 200){
            localStorage.setItem('currentUser', JSON.stringify(response.body))
            this.updateProfile.emit();
            this.close();
          }
        }
        
      }
    )
      

    }
  }
