/**
 * Various declarations missing from Node.js, needed to fix TypeScript compiler errors
 * @since 0.0.1
 */
declare namespace NodeJS  {
    interface Global {
        debug: boolean;
    }
}
