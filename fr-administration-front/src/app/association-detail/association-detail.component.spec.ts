import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationDetailComponent } from './association-detail.component';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { routes } from '../app.routes';
import { provideHttpClient } from '@angular/common/http';

describe('AssociationDetailComponent', () => {
  let component: AssociationDetailComponent;
  let fixture: ComponentFixture<AssociationDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssociationDetailComponent],
      providers: [provideHttpClient(),provideRouter(routes)]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
