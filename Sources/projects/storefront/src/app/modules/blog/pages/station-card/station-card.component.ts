import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { StationReservationComponent } from '../station-reservation/station-reservation.component';

export type ProductCardLayout = 'grid' | 'list' | 'table' | 'horizontal';

@Component({
  selector: 'app-station-card',
  templateUrl: './station-card.component.html',
  styleUrls: ['./station-card.component.scss']
})

export class StationCardComponent implements OnInit {

  @Input() layout: ProductCardLayout;

  @HostBinding('class.product-card') classProductCard = true;

  @HostBinding('class.product-card--layout--grid')
  get classProductCardLayoutGrid(): boolean {
      return this.layout === 'grid';
  }

  @HostBinding('class.product-card--layout--list')
  get classProductCardLayoutList(): boolean {
      return this.layout === 'list';
  }

  @HostBinding('class.product-card--layout--table')
  get classProductCardLayoutTable(): boolean {
      return this.layout === 'table';
  }

  @HostBinding('class.product-card--layout--horizontal')
  get classProductCardLayoutHorizontal(): boolean {
      return this.layout === 'horizontal';
  }

  modalRef: BsModalRef;
  
  constructor(
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
  }

  openModal() {
    this.modalRef = this.modalService.show(StationReservationComponent,  {
      initialState: {
        title: 'Station Appoitement',
        //data:
        // add from the ngFor the id to get it
        // send it to the dialog
      }
    });
  }
}
