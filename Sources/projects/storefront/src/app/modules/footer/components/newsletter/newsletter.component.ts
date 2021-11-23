import { Component, HostBinding } from '@angular/core';
import { theme } from '../../../../../data/theme';

@Component({
    selector: 'app-newsletter',
    templateUrl: './newsletter.component.html',
    styleUrls: ['./newsletter.component.scss'],
})
export class NewsletterComponent {
    @HostBinding('class.footer-newsletter') classFooterNewsletter = true;

    theme = theme;

    socialLinks = [
        {type: 'facebook',  url: theme.author.profile_url, icon: 'fab fa-facebook-f'},
        {type: 'instagram', url: theme.author.profilee_url, icon: 'fab fa-instagram'},

    ];

    constructor() { }
}
