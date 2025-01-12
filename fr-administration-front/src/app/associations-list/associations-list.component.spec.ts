import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationsListComponent } from './associations-list.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from '../app.routes';

describe('AssociationsListComponent', () => {
  let component: AssociationsListComponent;
  let fixture: ComponentFixture<AssociationsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssociationsListComponent],
      providers: [provideHttpClient(),provideRouter(routes)]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
