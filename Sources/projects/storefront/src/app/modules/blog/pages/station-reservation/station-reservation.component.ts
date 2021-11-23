import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-station-reservation',
  templateUrl: './station-reservation.component.html',
  styleUrls: ['./station-reservation.component.scss']
})
export class StationReservationComponent implements OnInit {

  constructor(
    public modalRef: BsModalRef,
    private router : Router
    ) { }
  title
  ngOnInit(): void {
  }

  BookNow(){
    this.router.navigateByUrl(`/blog/successReservation`).then()
  }

}
