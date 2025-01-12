import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCardComponent } from './user-card.component';
import { provideHttpClient } from '@angular/common/http';
import { AssociationData } from '../associations-list/associations-list.component';
import { UserData } from '../users-list/users-list.component';
import { provideRouter, provideRoutes } from '@angular/router';
import { routes } from '../app.routes';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

const mockUser: UserData = {
  id: 1,
  firstname: 'John',
  lastname: 'Doe',
  age: 30,
  role: 'Admin',
};

const mockAssociations: AssociationData[] = [
  { id: 1, name: 'Association 1',members: [mockUser] },
  { id: 2, name: 'Association 2',members: [mockUser]  },
];

describe('UserCardComponent', () => {
  let component: UserCardComponent;
  let fixture: ComponentFixture<UserCardComponent>;
  let componentHTMLElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCardComponent],
      providers: [provideHttpClient(),provideRouter(routes)],
    }).compileComponents();

    fixture = TestBed.createComponent(UserCardComponent);
    component = fixture.componentInstance;
    componentHTMLElement = fixture.debugElement;
    component.user = mockUser
    component.associations = mockAssociations
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use the provided user data', () => {
    expect(component.user.firstname).toBe('John');
    expect(component.user.lastname).toBe('Doe');
    expect(component.user.age).toBe(30);
  });

  it('should render the user information in the template', () => {
    const nameElement = componentHTMLElement.query(By.css('.user-card-wrap-content-infos h1')).nativeElement;
    const ageElement = componentHTMLElement.query(By.css('.user-card-wrap-content-infos p')).nativeElement;

    expect(nameElement.textContent).toContain('John Doe');
    expect(ageElement.textContent).toContain('30 ans');
  });

  it('should render associations in the template', () => {
    const associationElements = componentHTMLElement.queryAll(By.css('.user-card-wrap-associations-item p'));

    expect(associationElements.length).toBe(2);
    expect(associationElements[0].nativeElement.textContent).toContain('Association 1');
    expect(associationElements[1].nativeElement.textContent).toContain('Association 2');
  });

  it('should display "No associations" if there are no associations', () => {
    component.associations = [];
    fixture.detectChanges();

    const noAssociationsElement = componentHTMLElement.query(By.css('.user-card-wrap-associations-item p')).nativeElement;

    expect(noAssociationsElement.textContent).toContain('No associations');
  });
});
