import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinutesCardComponent } from './minutes-card.component';

describe('MinutesCardComponent', () => {
  let component: MinutesCardComponent;
  let fixture: ComponentFixture<MinutesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinutesCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinutesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
