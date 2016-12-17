/**
 * @file Contains all code responsible for generating the static site from extracted meta data
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @since 0.2.0
 */

/**
 * Default name of the directory into which the generated files will be placed
 * @since 0.2.0
 */
export const DEFAULT_BUILD_DIRECTORY_NAME = 'build';

/**
 * Interfaces for partially applied URL and asset path generators
 * @since 0.2.0
 */
export interface IUrlGenerator {
    (id: string): string;
}
export interface IAssetPathGenerator {
    (assetPath: string): string;
}

/**
 * Interface for a function that parses content extracted from a content file
 * @since 0.2.0
 */
export interface ContentParser {
    (contentString: string): string;
}

/**
 * @class A class.
 * @since 0.2.0
 */
class SiteGenerator {
}