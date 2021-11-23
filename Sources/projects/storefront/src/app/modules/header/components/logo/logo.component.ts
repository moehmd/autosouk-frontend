import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Component({
    selector: 'app-logo',
    templateUrl: './logo.component.html',
    styleUrls: ['./logo.component.scss'],
})
export class LogoComponent {
    constructor(private translate : TranslateService) {
        //this.getLanguage()
    }

    languageArabic : boolean = false

    getLanguage(){
        
        if(this.translate.currentLang == "ar"){
            this.languageArabic = true
        }
    }

}
