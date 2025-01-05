import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit {
  isLogged: boolean = false;
  profilePicture: string = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')!).avatar : ""

  constructor(private service:TokenStorageService, private route:Router) {}

  ngOnInit(): void {
     this.isLogged =  this.service.isLogged();
     
  }

  logout():void {
    this.service.clear();
    this.isLogged = false;
    this.route.navigateByUrl("/login");
  }


}
