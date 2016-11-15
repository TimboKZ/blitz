declare module 'front-matter' {
    function fm(fmString: string): { attributes: any; body: string; frontmatter: string; };
    namespace fm {}
    export = fm;
}
