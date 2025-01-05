import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { NavComponent } from './nav/nav.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,UsersListComponent,NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'fr-administration-front';
  showNav: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.showNav = this.router.url !== '/login';
    });
  }
}
