import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AssociationData } from '../associations-list/associations-list.component';
import { FormsModule } from '@angular/forms';
import { UserData } from '../users-list/users-list.component';
import { ApiHelperService } from '../services/api-helper.service';
import { CommonModule } from '@angular/common';
import { lastValueFrom, Observable } from 'rxjs';

export interface AssociationUpdate {
  name: string | undefined;
  members: UserData[] | undefined;
}

@Component({
  selector: 'app-popup-update-association',
  imports: [FormsModule, CommonModule],
  templateUrl: './popup-update-association.component.html',
  styleUrls: ['./popup-update-association.component.scss']
})
export class PopupUpdateAssociationComponent implements OnInit {
  @Input() associationData!: AssociationData;
  @Output() closePopup = new EventEmitter<void>();
  @Output() contentUpdated = new EventEmitter<void>();
  showPopupAddMembers: boolean = false;
  usersList!: UserData[];
  usersListFiltered!: UserData[];

  newAssociationDetail!: AssociationUpdate;
  membersSelected: UserData[] = [];

  constructor (private api: ApiHelperService) {};

  ngOnInit(): void {
    if (this.associationData && this.associationData.members) {
      this.newAssociationDetail = {
        members:  JSON.parse(JSON.stringify(this.associationData.members)),
        name: this.associationData.name,
      };
    } else {
      console.error('associationData is undefined or does not have members');
    }
  }

  close() {
    this.closePopup.emit();
  }

  // Vérifie s'il y a déjà un president
  havePresident(): boolean {
    if (this.newAssociationDetail.members) {
      return this.newAssociationDetail.members.some((member) => member.role === 'president');
    }
    return false;
  }

  haveTreasurer(): boolean {
    if (this.newAssociationDetail.members) {
      return this.newAssociationDetail.members.some((member) => member.role === 'treasurer');
    }
    return false;
  }

  openPopupAddMembers(): void{
    this.showPopupAddMembers = true;
    this.getAllUsers();
  }

  closePopupAddMembers(): void{
    this.showPopupAddMembers = false;
  }

  getAllUsers(): void{
    this.api.get({endpoint: '/users'})
    .subscribe({
      next: (response) => {
        this.usersList = (response.body as UserData[]).filter(
          (user) => !this.newAssociationDetail.members?.some((member) => member.id === user.id)
        );
        this.usersListFiltered = (response.body as UserData[]).filter(
          (user) => !this.newAssociationDetail.members?.some((member) => member.id === user.id)
        );
      },
    error: (error) => console.log('error')});
  }

  searchUser(event:Event) {
    const value = (event.target as HTMLInputElement).value;
    this.usersListFiltered =  this.usersList.filter((user:UserData) => 
      user.lastname.toLowerCase().includes(value.toLowerCase()) ||
      user.firstname.toLowerCase().includes(value.toLowerCase()))
  }

  selectMember(member: UserData) {
    const index = this.membersSelected.indexOf(member);
    if (index !== -1) {
      this.membersSelected.splice(index, 1);
    } else {
      member.role = 'member'
      this.membersSelected.push(member);
    }
  }

  async addSelectedMembers(){
    if (this.membersSelected.length > 0) {
      this.newAssociationDetail.members?.push(...this.membersSelected)


      for (const member of this.membersSelected) {
        try {
          await lastValueFrom(this.api.put({ endpoint: `/associations/${this.associationData.id}/${member.id}` }));
        } catch (error) {
          console.error('Erreur lors de l’ajout du membre:', error);
        }
      }
      
      this.contentUpdated.emit()
    }
    
    this.showPopupAddMembers = false;
    
  }

  updateNameAssociation(): void{
    this.api.put({endpoint: `/associations/${this.associationData.id}`, data: {name: this.newAssociationDetail.name}}).subscribe({
      next: (response) => {
        if (response.ok && response.status === 200){
          this.contentUpdated.emit();
          this.close();
        }
      }
    })
  }

  removeMember(idToRemove: number): void{
    this.api.delete({endpoint: `/associations/${this.associationData.id}/${idToRemove}`}).subscribe({
      next: (response) => {
        if (response.ok && response.status === 200){
          this.contentUpdated.emit();
          this.newAssociationDetail.members = this.newAssociationDetail.members?.filter(
            (member) => member.id !== idToRemove
          );
        }
        
      }
    })
  }

  updateRole(idMember: number, event: Event){
    const newRole = (event.target as HTMLSelectElement).value;
    console.log(newRole);
    
    this.api.put({endpoint: `/roles/${idMember}/${this.associationData.id}`, data: {name: newRole}}).subscribe({
      next: (response) => {
        if (response.ok) {
          this.contentUpdated.emit()

        }
        
      }
    })
    
  }
  


}
