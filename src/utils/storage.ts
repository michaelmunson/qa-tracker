import { QAResultsList } from "../types";

export namespace Storage {
    export namespace QAResults {
        export async function put(newQaResults:QAResultsList[number]){
            const prevResults = localStorage.getItem('qa-results');
            const prevResultsList:QAResultsList = (prevResults ? JSON.parse(prevResults) : []);
            prevResultsList.push(newQaResults)
            localStorage.setItem('qa-results', JSON.stringify(prevResultsList))
        }
        export async function get() : Promise<QAResultsList> {
            const results = localStorage.getItem('qa-results');
            return results ? JSON.parse(results) : []
        }
    }
    
}