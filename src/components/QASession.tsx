import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
    Box,
    Stepper,
    Step,
    StepLabel,
    StepContent,
    Button,
    Paper,
    Typography,
    Stack,
    LinearProgress,
    TextField
} from "@mui/material"
import "./qa-session.css"

type Grade = "passed" | "failed" | "partial"

interface Instructions {
    [key: string]: (
        string[] | Instructions
    )
}

interface QAResult {
    instruction: string
    grade?: Grade
    reason?: string
}


function QAInstructionList({
    instructionList,
    handleNext
}: {
    instructionList: string[],
    handleNext: (results: QAResult[]) => void
}) {
    const [qaResults, setQaResults] = useState<(QAResult | null)[]>(instructionList.map(x => null));
    const [activeIndex, setActiveIndex] = useState(0);
    const activeInstruction = useMemo(() => instructionList[activeIndex], [activeIndex])
    const [result, setResult] = useState<QAResult>({instruction: activeInstruction});
    const getVariant = useCallback((conditional: boolean) => conditional ? "contained" : "outlined", []);
    const progressPercent = useMemo(() => Math.round((qaResults.filter(x => !!x).length / instructionList.length) * 100), [qaResults])

    useEffect(() => {
        if (result?.grade === "passed") {
            setQaResults(arr => {
                const newArr = [...arr];
                newArr[activeIndex] = result;
                return newArr
            });
            setResult({instruction: instructionList[activeIndex+1]});
            setActiveIndex(act => act + 1);
        }
    }, [result]);

    useEffect(() => progressPercent === 100 ? handleNext(qaResults as QAResult[]) : undefined, [progressPercent])

    return (
        <div className="qa-instruction-list">
            <div className="progress">
                <p>{progressPercent}% Complete</p>
                <LinearProgress variant="determinate" value={progressPercent} style={{ borderRadius: "10px", height: '5px', width: '100%' }} />
            </div>
            <div className="qa-instruction">
                <h3>{activeInstruction}</h3>
                <div className="grade-buttons">
                    <Button variant={getVariant(result?.grade === "failed")} color="error" onClick={() => setResult(prev => ({ ...prev, grade: "failed" }))}> Failed </Button>
                    <Button variant={getVariant(result?.grade === "partial")} color="warning" onClick={() => setResult(prev => ({ ...prev, grade: "partial" }))}> Partial </Button>
                    <Button variant={getVariant(result?.grade === "passed")} color="success" onClick={() => setResult(prev => ({ ...prev, grade: "passed" }))}> Passed </Button>
                </div>
                <div 
                    style={{
                        display:"flex",
                        flexDirection: "column",
                        gap:"10px",
                        overflow: 'hidden',
                        maxHeight: (result?.grade && result.grade !== "passed") ? "200px" : "0px",
                        transition: '500ms'
                    }}>
                    <TextField
                        key={`fail-reason-${activeIndex}`}
                        helperText={`What is the reason for the ${result?.grade?.toUpperCase()} grade? Please be specific and include as many details as possible.`}
                        placeholder={`Reason for ${result?.grade?.toUpperCase()} grade?`}
                        onChange={e => setResult(prev => ({...prev, reason: e.target.value}) as QAResult)}
                        multiline
                        rows={4}
                    />
                    <Button disabled={!result?.reason} variant="outlined" onClick={() => {
                        setQaResults(arr => {
                            const newArr = [...arr];
                            newArr[activeIndex] = result as QAResult;
                            return newArr
                        });
                        setResult({instruction: instructionList[activeIndex+1]});
                        setActiveIndex(act => act + 1);
                    }}> Continue </Button>
                </div>

                {/* {result?.grade && result.grade !== "passed" ? (
                    
                ) : (
                    <></>
                )} */}
            </div>
        </div>
    )
}

function QAInstructionSet({
    instructions,
    level = 0,
    handleNext
}: {
    instructions: Instructions,
    level?: number
    handleNext: (results: Record<string, any>) => void
}) {
    const [qaResults, setQaResults] = useState<Record<string, any>>(
        Object.entries(instructions).reduce((acc, [key, val]) => ({ ...acc, [key]: null }), {})
    )

    const [activeStep, setActiveStep] = React.useState(0);

    useEffect(() => {
        if ((Object.values(qaResults).filter(x => !!x).length === Object.values(instructions).length)) {
            handleNext(qaResults);
        }
    }, [qaResults])

    return (
        <div className="qa-instruction-set">
            <Stepper activeStep={activeStep} orientation="vertical">
                {Object.entries(instructions).map(([label, value], index) => {
                    if (Array.isArray(value)) return (
                        <Step key={`${label.replaceAll(' ', '')}-${index}-key`}>
                            <StepLabel>
                                {label}
                                {/* <Typography style={{fontSize: `${1 - (level * .1)}rem`}}>{label}</Typography> */}
                            </StepLabel>
                            <StepContent>
                                <QAInstructionList
                                    instructionList={value}
                                    handleNext={(results: QAResult[]) => {
                                        setQaResults(prev => ({
                                            ...prev,
                                            ...{ [label]: results }
                                        }))
                                        setActiveStep(p => index + 1);
                                    }} />
                            </StepContent>
                        </Step>
                    )
                    else return (
                        <Step key={`${label.replaceAll(' ', '')}-${index}-key`}>
                            <StepLabel>
                                {label}
                                {/* <Typography style={{fontSize: `${1 - (level * .1)}rem`, fontWeight:"bold"}}>{label}</Typography> */}
                            </StepLabel>
                            <StepContent>
                                <QAInstructionSet
                                    instructions={value}
                                    level={level + 1}
                                    handleNext={(results: Record<string, any>) => {
                                        setQaResults(prev => ({
                                            ...prev,
                                            ...{ [label]: results }
                                        }))
                                        setActiveStep(index + 1);
                                    }}
                                />
                            </StepContent>
                        </Step>
                    );
                })}
            </Stepper>
        </div>
    );
}

export default function QASession({
    instructions
}: {
    instructions: Instructions
}) {
    const [qaResults, setQaResults] = useState<Record<string, any>>();

    useEffect(() => {
        if (qaResults) {
            let prevResults = localStorage.getItem('qa-results') ;
            prevResults = (prevResults ? JSON.parse(prevResults) : {});
            localStorage.setItem('qa-results', JSON.stringify({
                ...prevResults as any,
                [`Mike - ${new Date().toLocaleString()}`] : qaResults
            }))
        }
    }, [qaResults])

    return (
        <div id="qa-session">
            <QAInstructionSet
                instructions={instructions}
                handleNext={results => {
                    setQaResults(results)
                }} />
        </div>
    )
}

