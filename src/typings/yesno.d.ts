declare module 'yesno' {
    class YesNo {
        public static ask(
            question: string,
            default_value: boolean|null,
            response_handler: (answer: boolean) => void,
            yes_values?: string[],
            no_values?: string[]
        )
    }
    namespace YesNo {}
    export = YesNo;
}
