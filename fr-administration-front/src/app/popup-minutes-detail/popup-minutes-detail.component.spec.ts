import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupMinutesDetailComponent } from './popup-minutes-detail.component';

describe('PopupMinutesDetailComponent', () => {
  let component: PopupMinutesDetailComponent;
  let fixture: ComponentFixture<PopupMinutesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupMinutesDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupMinutesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
