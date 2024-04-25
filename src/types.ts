export enum PageRoutes {
    home = "/",
    newSession = "/new-session"
}

export type Grade = "passed" | "failed" | "partial"

export type QASessionType = "extension"|"webapp"

export interface Instructions {
    [key: string]: (
        string[] | Instructions
    )
}

export interface QAResult {
    instruction: string
    grade: Grade
    reason?: string
}

export interface QAResultObject {
    [key: string]: (
        QAResult[] | QAResultObject
    )
}

export type QAResultsList = Array<{
    type:QASessionType
    tester:string
    config:{
        practice:string
        pt:string
    }
    timestamp:number
    results:QAResultObject
}>

export function isQAResult(x:any) : x is QAResult {
    return x?.instruction && x?.grade;
}

export function isQAResultArray(x:any) : x is QAResult[] {
    return Array.isArray(x)
}

export function isQAResultObject(x:any) : x is QAResultObject {
    return !Array.isArray(x)
}

