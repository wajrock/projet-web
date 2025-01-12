import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupUpdateProfileComponent } from './popup-update-profile.component';
import { provideHttpClient } from '@angular/common/http';

describe('PopupUpdateProfileComponent', () => {
  let component: PopupUpdateProfileComponent;
  let fixture: ComponentFixture<PopupUpdateProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupUpdateProfileComponent],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupUpdateProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
