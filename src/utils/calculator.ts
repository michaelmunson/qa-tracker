import { QAResultObject } from "../types";

export function calculateResults(qaResults:QAResultObject){
    const aggregate = {
        passed: 0,
        partial: 0,
        failed: 0
    }

    for (const [name, value] of Object.entries(qaResults)){
        if (Array.isArray(value)){
            for (const item of value){
                aggregate[item.grade] += 1;
            }
        } else {
            const {passed, partial, failed} = calculateResults(value);
            aggregate.passed += passed;
            aggregate.partial += partial;
            aggregate.failed += failed;
        }
    }

    return aggregate;
}