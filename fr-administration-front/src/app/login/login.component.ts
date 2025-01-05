import { Component, OnInit } from '@angular/core';
import { ApiHelperService } from '../services/api-helper.service';
import { TokenStorageService } from '../services/token-storage.service';
import { Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';
import { NavComponent } from '../nav/nav.component';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-login',
  imports: [NavComponent, ToastComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  errorMessage:string = '';

  constructor(
    private api: ApiHelperService,
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
      if (this.tokenStorageService.isLogged()){
        this.router.navigateByUrl('/users')
      }
  }
  
  login():void{
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    if (username != "" && password != ""){
      this.api.post({endpoint: '/auth/login', data: {username, password}})
      .subscribe({
        next: (response) => {
          this.tokenStorageService.save(response.body.access_token)
          if (this.tokenStorageService.isLogged()) {
            this.router.navigateByUrl('/users');
          } else {
            this.router.navigateByUrl('/login');
          }
          localStorage.setItem('currentUser', JSON.stringify(response.body.user));
        },
        error: () =>{this.errorMessage = 'Incorrect id or password !'},
      })
    } else {
      this.errorMessage = "All fields are required !"
    }
    
    
  }

  closePopup():void {
    
    
    this.errorMessage = "";
  }

}
