import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Params_SendFeedback, Proxy } from 'projects/storefront/src/app/services/proxy.service';
import { theme } from '../../../../../data/theme';

@Component({
    selector: 'app-page-contact-us-one',
    templateUrl: './page-contact-us-one.component.html',
    styleUrls: ['./page-contact-us-one.component.scss'],
})
export class PageContactUsOneComponent {
    theme = theme;
    email : string = ''
    message : string = ''
    subject : string = ''
    fullName : string = ''

    sendInProgress = false

    constructor
    (
        private proxy : Proxy,
        private toastr : ToastrService
    ) { }

    sendFeedback(){
        
        var params : Params_SendFeedback = new Params_SendFeedback()
        params.email = this.email
        params.fullName = this.fullName
        params.message = this.message
        this.sendInProgress = true
        this.proxy.SendFeedback(params).subscribe(d => {
            this.sendInProgress = false
            this.toastr.success("Your Feedback has been succefully sent!")
        })
        this.email = ''
        this.fullName = ''
        this.subject = ''
        this.message = ''
    }
}
