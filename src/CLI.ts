/**
 * @file Contains code responsible for routing `blitz` CLI commands to the `blitz` module
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2016
 * @license GPL-3.0
 * @since 0.2.0
 */

/**
 * @class Exposes an API for the CLI
 * @since 0.2.0
 */
export class CLI {
    /**
     * Runs Blitz with the specified command line arguments
     * @since 0.2.0
     */
    public static run(args: string[]) {
        console.log(args);
    }

    /**
     * Initialises a Blitz project from a template
     * @since 0.2.0
     */
    public static init(templateName: string) {

    }

    /**
     * Builds the website using `blitz.yml`
     * @since 0.2.0
     */
    public static build() {

    }

    /**
     * Watches the current directory and rebuilds certain parts of the website when necessary
     * @since 0.2.0
     */
    public static watch() {

    }

    /**
     * Runs a web server with the preview of the website
     * @since 0.2.0
     */
    public static preview() {

    }
}

