import React, { useEffect, useState } from 'react'
import { QAResultsList } from '../types'
import { ProgressSpinner } from 'primereact/progressspinner';
import { Accordion, AccordionTab } from 'primereact/accordion'
import $ from 'ez-inline'

const convertToName = ({tester, type, timestamp}:{tester:string, type:string, timestamp:number}) => {
    return `${type[0].toUpperCase() + type.slice(1)}: ${tester}  —  ${new Date(timestamp).toLocaleString()}`
}

export default function Results({
    qaResults
}: {
    qaResults: QAResultsList | undefined
}) {
    const [activeIndex, setActiveIndex] = useState(0);

    if (!qaResults) return (
        <div style={$`w-100 height-90vh flex justify-content-center align-items-center`}>
            <ProgressSpinner />
        </div>
    )

    return (
        <div>
            <Accordion activeIndex={activeIndex}>
                {qaResults.map((result, index) => (
                    <AccordionTab header={convertToName({tester:result.tester, type: result.type, timestamp:result.timestamp})}>
                        
                    </AccordionTab>
                ))}
            </Accordion>
        </div>

    )
    // return (
    //     <div style={$`w-100 h-100 flex col align-items-center`}>
    //         <Accordion activeIndex={0}>
    //             {qaResults.map((results, index) => {
    //                 console.log('QA RESULT', results)
    //                 return (
    //                     <div>asd123</div>
    //                     // <ResultAccordionTab key={`results-tab-${index}`} results={results}/>
    //                 )
    //             })}
    //         </Accordion>
    //     </div>
    // )
}
