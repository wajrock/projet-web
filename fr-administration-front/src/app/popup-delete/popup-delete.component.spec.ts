import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupDeleteComponent } from './popup-delete.component';
import { provideHttpClient } from '@angular/common/http';

describe('PopupDeleteComponent', () => {
  let component: PopupDeleteComponent;
  let fixture: ComponentFixture<PopupDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupDeleteComponent],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
