/**
 * @file File containing all constants, interfaces and classes related to Blitz YAML config.
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @version 0.0.2
 */

import * as path from 'path';
import * as fs from 'fs';
import {Util} from './Util';

/**
 * Default Blitz config name
 * @since 0.0.1
 */
export const DEFAULT_CONFIG_NAME = 'blitz.yml';

/**
 * @class Class responsible for various operations with the config
 * @since 0.0.1
 */
export class Config {
    /**
     * Loads YAML config from specified path
     * @since 0.0.1
     */
    public static load(configPath: string = path.join(process.cwd(), DEFAULT_CONFIG_NAME)): any {
        let configContent: string;
        Util.debug('Loading Blitz config from `' + configPath + '`...');
        try {
            configContent = fs.readFileSync(configPath, 'utf8');
        } catch (e: Error) {
            Util.error('Error reading `' + configPath + '`. Are you sure it exists?');
            Util.error(e);
            return undefined;
        }
        let config = Util.parseYaml(configContent);
        if (!config) {
            Util.error('Error parsing YAML! Are you sure `' + configPath + '` is valid?');
            return undefined;
        }
        Util.debug('Successfully parsed YAML!');
        return config;
    }

    /**
     * Verifies that the supplied object is a valid Blitz config
     * @since 0.0.2
     */
    public static verify(config: any): boolean {
        // TODO: Write actual checks
        return true;
    }
}

