/**
 * @file All code related to site menus
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @since 0.2.0
 */

import {IUrlGenerator} from '../core/ProjectBuilder';

/**
 * Menu item as it will be passed to Pug locals
 * @since 0.2.0
 */
export interface ISiteMenuItem {
    title: string;
    url: string;
    active: number;
    [key: string]: any;
}

/**
 * Map of all menus available to a Pug template
 * @since 0.2.0
 */
export interface ISiteMenuMap {
    [menuName: string]: ISiteMenuItem[];
}
