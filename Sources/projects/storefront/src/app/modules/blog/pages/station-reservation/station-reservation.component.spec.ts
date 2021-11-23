import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationReservationComponent } from './station-reservation.component';

describe('StationReservationComponent', () => {
  let component: StationReservationComponent;
  let fixture: ComponentFixture<StationReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StationReservationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StationReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
