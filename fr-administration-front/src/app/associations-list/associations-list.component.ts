import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { NavComponent } from '../nav/nav.component';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { AssociationCardComponent } from '../association-card/association-card.component';
import { UserData } from '../users-list/users-list.component';

export interface AssociationData {
  id: number;
  name: string;
  logo: string;
  members: UserData[]
}

@Component({
  selector: 'app-associations-list',
  imports: [MatTableModule, NavComponent, RouterLink, AssociationCardComponent],
  templateUrl: './associations-list.component.html',
  styleUrl: './associations-list.component.scss',
})
export class AssociationsListComponent {
  displayedColumns: string[] = ['id', 'name', 'actions'];
  originaleDataSource: AssociationData[] = [];
  dataSource: AssociationData[] = [];
  constructor(private http: HttpClient, private service: TokenStorageService) {}

  ngOnInit(): void {
    this.fetchAssociation()
  }

  fetchAssociation():void{
    this.http.get('http://localhost:3000/associations', { observe: 'response' })
      .subscribe({
        next: (response) => {
          this.originaleDataSource =  response.body as [];
          this.dataSource =  response.body as [];
        },
      error: (error) => console.log('error')});
  }

  search(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.dataSource = this.originaleDataSource.filter(
      (data: AssociationData) =>
        data.name.toLowerCase().includes(value.toLowerCase()) ||
        data.id.toString() === value
    );
  }

  removeAssociation(idToRemove:number):void{
    this.http.delete(`http://localhost:3000/associations/${idToRemove}`,{observe: 'response'})
    .subscribe({
      next: (response) => {
        if (response.ok){
          this.fetchAssociation()
        }
      }
    })
  }
}
