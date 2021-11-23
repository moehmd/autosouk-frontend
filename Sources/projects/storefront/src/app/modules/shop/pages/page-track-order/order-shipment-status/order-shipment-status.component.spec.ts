import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderShipmentStatusComponent } from './order-shipment-status.component';

describe('OrderShipmentStatusComponent', () => {
  let component: OrderShipmentStatusComponent;
  let fixture: ComponentFixture<OrderShipmentStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderShipmentStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderShipmentStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
