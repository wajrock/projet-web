import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupAddAssociationComponent } from './popup-add-association.component';
import { provideHttpClient } from '@angular/common/http';

describe('PopupAddAssociationComponent', () => {
  let component: PopupAddAssociationComponent;
  let fixture: ComponentFixture<PopupAddAssociationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupAddAssociationComponent],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupAddAssociationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
