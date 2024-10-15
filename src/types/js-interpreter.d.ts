declare module 'js-interpreter' {
    export default class Interpreter {
        createNativeFunction: (func: any) => void
        createAsyncFunction: (func: any) => void
        constructor(code: string, initFunc?: (interpreter: Interpreter, globalObject: any) => void)
        step(): boolean
        run(): boolean
        appendCode(code: string): void
        paused: boolean
        setProperty(obj: any, name: string, value: any, descriptor?: PropertyDescriptor): void;
    }
}
