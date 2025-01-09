import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupUpdateAssociationComponent } from './popup-update-association.component';

describe('PopupUpdateAssociationComponent', () => {
  let component: PopupUpdateAssociationComponent;
  let fixture: ComponentFixture<PopupUpdateAssociationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupUpdateAssociationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupUpdateAssociationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
