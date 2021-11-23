import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { User } from './proxy.service';
//import { BehaviorSubject } from 'rxjs/BehaviorSubject';
//import { MatSnackBar } from '@angular/material';

@Injectable()
export class CommonService {
  public AuthAPIUrl = 'https://www.autosouk.co/WebAPI/api/Auth';
    //public AuthAPIUrl = 'https://webapi-wo0.conveyor.cloud/api/Auth';
    //public APIUrl = 'https://webapi-wo0.conveyor.cloud/api/Data';
    //public AuthAPIUrl = 'http://localhost:5000/api/Auth';
    //public APIUrl = 'http://localhost:5000/api/Data';
   public APIUrl = 'https://www.autosouk.co/WebAPI/api/Data';
  public ticket = '';
  Is_Logged_In = new BehaviorSubject<boolean>(false);
  UI_Direction = new BehaviorSubject<string>('ltr');
  AZURE_BLOB_IMAGES_CONTAINER =  "";
  UserDeatils: User []=[];
  constructor(private tostr : ToastrService) { }
  //constructor() { }

  ShowMessage(message: string, d: number = 1000) {
    this.tostr.show(message);
	//alert(message);
  }

  Handle_Exception(msg) {
    if ((msg != null) && (msg !== '')) {
      this.ShowMessage(msg , 3000);
    }
  }
}
