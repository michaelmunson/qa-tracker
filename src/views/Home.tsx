import React, { useCallback, useEffect, useMemo, useState } from 'react'
import "./home.css";
import { Stack } from '@mui/material';
import { Card } from "primereact/card";
import { Button } from "primereact/button"
import { Skeleton } from "primereact/skeleton"
import { useNavigate } from 'react-router-dom';
import { PageRoutes, QAResultsList } from '../types';
import $ from 'ez-inline';
import { Storage } from '../utils/storage';
import { Chart } from 'primereact/chart';
import { calculateResults } from '../utils/calculator';

type RefinedResultData = {
    name:string
    time:string
    passedPercent:number
    chartData: [number, number, number]
}

function ViewQAResults({
    qaResults
}: {
    qaResults: QAResultsList | undefined
}) {
    const navigate = useNavigate();
    const [lastQaResultData, setLastQaResultData] = useState<RefinedResultData>()

    useEffect(() => {
        if (qaResults) {
            console.log(qaResults)
            const lastRes = qaResults[qaResults.length - 1];
            const {passed, partial, failed} = calculateResults(lastRes.results);
            setLastQaResultData({
                name: `${lastRes.tester} - ${lastRes.type[0].toUpperCase()}${lastRes.type.slice(1)}`,
                time: new Date(lastRes.timestamp).toLocaleString(),
                passedPercent: Math.round((passed / (partial+failed)) * 100),
                chartData: [passed, partial, failed]
            })
        }
    }, [qaResults])

    const LoadingContent = useCallback(() => (
        <>
            <div style={$`flex col w-100 justify-content(space-between)`}>
                <div style={$`flex col gap-1`}>
                    <Skeleton width='100%' />
                    <Skeleton width='50%' />
                    <Skeleton width='25%' />
                </div>
                <Skeleton width='100%' height='50px' />
            </div>
            <div style={$`flex col w-100 align-items-center`}>
                <Skeleton shape='circle' size='10rem' />
            </div>
        </>
    ), [])

    return (
        <Card title="View QA Results" className='card' style={$`w-75 min-width-590px`}>
            <div style={$`flex row w-100 justify-content(space-between) flex-grow-1`}>
                {!lastQaResultData ? (
                    <LoadingContent />
                ) : (
                    <>
                        <div style={$`flex col justify-content(space-between) w-100`}>
                            <div style={$`flex col gap-2 height-100% pt-4`}>
                                <p style={$`m-0 font-size-1.2rem`}>Last Qa Result</p>
                                <hr style={$`w-100`} />
                                <p style={$`m-0 font-size-1.2rem`}>{new Date().toLocaleString()}</p>
                                <hr style={$`w-100`} />
                                <p style={$`m-0 font-size-1.2rem`}>89% of Tests Passed</p>
                            </div>
                            <Button label="View All Results" onClick={() => navigate(PageRoutes.results)}/>
                        </div>
                        <div style={$`flex col align-items-center w-100`}>
                            <Chart
                                type="doughnut"
                                data={{
                                    labels: ['Passed', 'Partial', 'Failed'],
                                    datasets: [
                                        {
                                            data: lastQaResultData.chartData,
                                            backgroundColor: [
                                                'green',
                                                'orange',
                                                'red'
                                            ]
                                        }
                                    ]
                                }}
                                options={{ cutout: '60%' }} />
                        </div>
                    </>
                )}
            </div>
        </Card>
    )
}

export default function Home({
    qaResults,
    setQaResults
}:{
    qaResults:QAResultsList|undefined
    setQaResults:React.Dispatch<React.SetStateAction<QAResultsList | undefined>>
}) {
    const navigate = useNavigate();

    return (
        <div id="home-page-container">
            <Stack direction={'row'} spacing={2}>
                <Card title="New QA Session" className='card'>
                    <Stack spacing={3}>
                        <Button label='New Extension QA Session' icon="pi pi-plus" onClick={() => navigate(PageRoutes.newSession + '?type=extension')} style={$`white-space-nowrap`} />
                        <Button disabled label='New WebApp QA Session' icon="pi pi-plus" onClick={() => navigate(PageRoutes.newSession + '?type=extension')} style={$`white-space-nowrap background-gray`} />
                    </Stack>
                </Card>
                <ViewQAResults qaResults={qaResults} />
            </Stack>
        </div>
    )
}
