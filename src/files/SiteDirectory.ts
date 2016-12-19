/**
 * @file Contains all code related to the representation of a site directory
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @since 0.2.0
 */

import {GenericDirectory} from './GenericDirectory';
import {DirectoryGenerator} from './DirectoryGenerator';

/**
 * @class Representation of a site directory
 * @since 0.2.0
 */
export class SiteDirectory extends GenericDirectory {
    private directoryGenerators: DirectoryGenerator[];
}
