export namespace Url {
    export namespace Params {
        export function parse(params:string){
            return new URLSearchParams(params)
        }
    }
}