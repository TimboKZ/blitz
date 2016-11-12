/**
 * @file File containing all constants, interfaces and classes related to Blitz YAML config.
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @version 0.0.1
 */

import * as yaml from 'js-yaml';
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
    public static loadConfig(configPath: string = path.join(process.cwd(), DEFAULT_CONFIG_NAME)): any {
        let configContent: string;
        Util.debug('Loading Blitz config from `' + configPath + '`...');
        try {
            configContent = fs.readFileSync(configPath, 'utf8');
        } catch (e: Error) {
            console.log('Error reading `' + configPath + '`. Are you sure it exists?');
            console.log(e);
            return;
        }
        let config: any;
        Util.debug('Parsing  YAML...');
        try {
            config = yaml.safeLoad(configContent);
        } catch (e: Error) {
            Util.log('Error parsing YAML! Are you sure `' + configPath + '` is valid?');
            Util.log(e);
            return;
        }
        Util.debug('Successfully parsed YAML!');
        return config;
    }
}

