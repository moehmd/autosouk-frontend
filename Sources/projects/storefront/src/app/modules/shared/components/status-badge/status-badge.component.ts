import { Component, HostBinding, Input } from '@angular/core';

export type StatusBadgeType = false | true;

export type StatusBadgeRefundable = false | true;

export type StatusBadgeIcon = 'success' | 'failure';

@Component({
    selector: 'app-status-badge',
    templateUrl: './status-badge.component.html',
    styleUrls: ['./status-badge.component.scss'],
})
export class StatusBadgeComponent {
    @Input() type: StatusBadgeType;

    @Input() refund: StatusBadgeRefundable;

    @Input() icon: StatusBadgeIcon;

    @Input() text: string;

    @Input() tooltipContent: string;

    @HostBinding('class.status-badge') classStatusBadge = true;

    @HostBinding('class.status-badge--style--success') get classStatusBadgeTypeSuccess(): boolean {
        return this.type === true;
    }

    // @HostBinding('class.status-badge--style--success') get classStatusBadgeRefundSuccess(): boolean {
    //     return this.refund === true;
    // }

    // @HostBinding('class.status-badge--style--failure') get classStatusBadgeNotRefundSuccess(): boolean {
    //     return this.refund === false;
    // }

    @HostBinding('class.status-badge--style--failure') get classStatusBadgeTypeFailure(): boolean {
        return this.type === false;
    }

    // @HostBinding('class.status-badge--style--warning') get classStatusBadgeTypeWarning(): boolean {
    //     return this.type === 'warning';
    // }

    // @HostBinding('class.status-badge--style--unknown') get classStatusBadgeTypeUnknown(): boolean {
    //     return this.type === 'unknown';
    // }

    @HostBinding('class.status-badge--has-text') get classStatusBadgeHasText(): boolean {
        return !!this.text;
    }

    @HostBinding('class.status-badge--has-icon') get classStatusBadgeHasIcon(): boolean {
        return !!this.icon;
    }

    constructor() { }
}
