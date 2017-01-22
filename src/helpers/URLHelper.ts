import {IUrlGenerator} from '../core/ProjectBuilder';
/**
 * @file Various helper utilities related to URLs
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 */

export class URLHelper {

    public static split(uri: string): string[] {
        return uri.split('/');
    }

    public static join(uriParts: string[]): string {
        return uriParts.join('/');
    }

    public static prepareUrlGenerator(currentUrl: string): IUrlGenerator {
        return URLHelper.generateUrl.bind(undefined, currentUrl);
    }

    public static prepareUrlGenerator(currentUrl: string): IUrlGenerator {
        return URLHelper.generateUrl.bind(undefined, currentUrl);
    }

    public static generateUrl(currentUrl: string, targetUrl: string): string {
        return '';
    }

}
