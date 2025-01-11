import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserData } from '../users-list/users-list.component';
import { HttpClient } from '@angular/common/http';
import { AssociationData } from '../associations-list/associations-list.component';
import { MatTableModule } from '@angular/material/table';
import { AssociationCardComponent } from '../association-card/association-card.component';
import { PopupComponent } from '../popup/popup.component';
import { PopupUpdateProfileComponent } from '../popup-update-profile/popup-update-profile.component';
import { PopupDeleteComponent } from '../popup-delete/popup-delete.component';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-user-detail',
  imports: [MatTableModule, RouterLink, AssociationCardComponent, PopupComponent,PopupUpdateProfileComponent,PopupDeleteComponent],
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss', '../../table.scss']
})
export class UserDetailComponent implements OnInit{
  idUser!: number;
  userDetail!: UserData;
  associations!: AssociationData[];
  displayedColumns: string[] = ['id', 'name', 'actions'];
  isProfile: boolean = false;
  showPopup: "edit" | "delete" | null = null;
  constructor(private route: ActivatedRoute, private router: Router,private http:HttpClient,private service:TokenStorageService) {}

  ngOnInit(): void {
    if (this.route.snapshot.url.some((segment) => segment.path === "profile")){
      this.idUser = JSON.parse(localStorage.getItem('currentUser')!).id;
      this.isProfile = true;
      this.fetchUserDetail();
    } else {
      this.idUser = +this.route.snapshot.params['id'];
      this.fetchUserDetail();
    }
  }

  fetchUserDetail(): void{
    this.http.get<UserData>(`http://localhost:3000/users/${this.idUser}`, { observe: 'response' })
    .subscribe({
      next: (response) => {
        if (response.ok && response.body){
          this.userDetail =  response.body;
        }
        
      },
    error: (error) => console.log('error')});

    this.http.get<AssociationData[]>(`http://localhost:3000/associations/user/${this.idUser}`, { observe: 'response' })
    .subscribe({
      next: (response) => {
        if (response.ok && response.body){
          this.associations =  response.body;
        }
        
      },
    error: (error) => console.log('error')});
  }

  openPopup(type: "edit"|"delete"): void{
    this.showPopup = type;
  }

  closePopup(): void{
    this.showPopup = null;
  }

  updateProfile(): void{
    this.fetchUserDetail();
  }

  removeUser(): void {
    this.http
      .delete(`http://localhost:3000/users/${this.idUser}`, {
        observe: 'response',
      })
      .subscribe({
        next: (response) => {
          if (response.ok) {
            this.service.clear();
            this.router.navigateByUrl("/login")
          }
        },
        error: (error) =>
          console.error('Error removing association:', error),
      });
  }

  
}
