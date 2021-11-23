import { MainMenuLink } from '../app/interfaces/main-menu-link';

export const mainMenu: MainMenuLink[] = [
    {
        title: 'Home',
        url: '/',
    },
    {
        title: 'Megamenu',
        url: '/shop',
        customFields: {
            ignoreIn: ['spaceship'],
        },
    },
    {
        title: 'Shop',
        url: '/shop/shop-grid-4-sidebar',

    },
    {
        title: 'Account',
        submenu: {
            type: 'menu',
            links: [
                {title: 'Login & Register', url: '/account/login'},
                {title: 'Dashboard', url: '/account/profile'},
            ],
        },
    },
    {
        title: 'Station',
        url: '/blog',
    },
    // {
    //     title: 'Pages',
    //     url: '/site/about-us',
    // },
];
