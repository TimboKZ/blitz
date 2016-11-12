/**
 * Declaring debug global variable
 */
declare namespace NodeJS  {
    interface Global {
        debug: boolean;
    }
}