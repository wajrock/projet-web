import { Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './guards/auth.guard';
import { AssociationsListComponent } from './associations-list/associations-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { AssociationDetailComponent } from './association-detail/association-detail.component';
import { UserGuard } from './guards/user.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'users', component: UsersListComponent, canActivate: [authGuard] },
    { path: 'users/:id', component: UserDetailComponent, canActivate: [authGuard, UserGuard] },
    { path: 'profile', component: UserDetailComponent, canActivate: [authGuard] },
    { path: 'associations', component: AssociationsListComponent, canActivate: [authGuard] },
    { path: 'associations/:id', component: AssociationDetailComponent, canActivate: [authGuard] },
    { path: '', component: LoginComponent }

];
