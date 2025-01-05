import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationCardComponent } from './association-card.component';

describe('AssociationCardComponent', () => {
  let component: AssociationCardComponent;
  let fixture: ComponentFixture<AssociationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssociationCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
