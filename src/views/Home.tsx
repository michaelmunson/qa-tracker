import React, { useState } from 'react'
import "./home.css";
import { Stack } from '@mui/material';
import { Card } from "primereact/card";
import { Button } from "primereact/button"
import { Skeleton } from "primereact/skeleton"
import { useNavigate } from 'react-router-dom';
import { PageRoutes } from '../types';
import $ from 'ez-inline';

function ViewQAResults() {
    const [loading, setLoading] = useState(true);
    return (
        <Card title="View QA Results" className='card' style={$`w-75`}>

        </Card>
    )
}

export default function Home() {
    const navigate = useNavigate();

    return (
        <div id="home-page-container">
            <Stack direction={'row'} spacing={2}>
                <Card title="New QA Session" className='card'>
                    <Stack>
                        <Button label='New Extension QA Session' icon="pi pi-plus" onClick={() => navigate(PageRoutes.newSession)} style={$`white-space-nowrap`}/>
                    </Stack>
                </Card>
                <ViewQAResults />
            </Stack>
        </div>
    )
}
