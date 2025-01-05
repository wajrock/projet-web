import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table'
import { Observable, lastValueFrom } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';
import { NavComponent } from '../nav/nav.component';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserCardComponent } from '../user-card/user-card.component';

export interface UserData{
  id: number,
  lastname: string,
  firstname: string,
  age: number;
  avatar: string;
  role?: string;
}

@Component({
  selector: 'app-users-list',
  imports: [MatTableModule, NavComponent,RouterLink, UserCardComponent],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})

export class UsersListComponent implements OnInit{
  displayedColumns: string[] = ['id', 'lastname', 'firstname', 'age', 'actions'];
  originaleDataSource: UserData[] = [];
  dataSource:UserData[] = [];
  constructor (private http: HttpClient,private service:TokenStorageService,private router:Router) {};
  

  ngOnInit(): void {
   this.fetchUser();
    
  }

  fetchUser():void{
    this.http.get('http://localhost:3000/users', { observe: 'response' })
      .subscribe({
        next: (response) => {
          this.originaleDataSource =  response.body as [];
          this.dataSource =  response.body as [];
        },
      error: (error) => console.log('error')});
  }

  search(event:Event):void{
    const value = (event.target as HTMLInputElement).value;
    this.dataSource = this.originaleDataSource.filter((data:UserData) => 
      data.lastname.toLowerCase().includes(value.toLowerCase()) || 
      data.id.toString() === value ||
      data.firstname.toLowerCase().includes(value.toLowerCase()))
    
  }

  addUser():void{
    this.http.post('http://localhost:3000/users',{firstname:"Will",lastname:"Smith",age:23,password:"password"}, {observe: 'response'})
    .subscribe({
      next: (response) => {
        if (response.ok){
          this.fetchUser()
        }
      }
      
    })
  }

  removeUser(idToRemove:number):void{
    this.http.delete(`http://localhost:3000/users/${idToRemove}`,{observe: 'response'})
    .subscribe({
      next: (response) => {
        if (response.ok){
          this.fetchUser()
        }
      }
    })
  }
  
}

