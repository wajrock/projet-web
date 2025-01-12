import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersListComponent } from './users-list.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from '../app.routes';

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersListComponent],
      providers: [provideHttpClient(), provideRouter(routes)]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
