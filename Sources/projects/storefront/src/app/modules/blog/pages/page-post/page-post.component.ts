import { Component, Input, OnInit } from '@angular/core';
import { blogPosts } from '../../../../../data/blog-posts';
import { blogComments } from '../../../../../data/blog-comments';
import { ActivatedRoute } from '@angular/router';
import { LayoutButton } from '../../../shop/components/products-view/products-view.component';
import { PageShopGridLayout, PageShopLayout } from '../../../shop/pages/page-shop/page-shop.component';

export type PagePostSidebarPosition = 'start' | 'end' | false;

export interface PagePostData {
    featuredImage: boolean;
    sidebarPosition: PagePostSidebarPosition;
}

@Component({
    selector: 'app-page-post',
    templateUrl: './page-post.component.html',
    styleUrls: ['./page-post.component.scss'],
})
export class PagePostComponent implements OnInit {
    posts = blogPosts;
    comments = blogComments;

    featuredImage = true;

    sidebarPosition: PagePostSidebarPosition = 'start';

    layoutButtons: LayoutButton[] = [
        {layout: 'grid', icon: 'layout-grid-16'},
        {layout: 'table', icon: 'layout-table-16'},
    ];


    @Input() layout: PageShopLayout = 'grid';

    @Input() gridLayout: PageShopGridLayout = 'grid-4-sidebar';

    @Input() offCanvasSidebar: 'always' | 'mobile' = 'mobile';
    
    hasImage = true;

    constructor(
        private route: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        this.route.data.subscribe((data: PagePostData) => {
            this.featuredImage = data.featuredImage;
            this.sidebarPosition = data.sidebarPosition;
        });
    }

    setLayout(value: PageShopLayout): void {
        this.layout = value;
    }
}
