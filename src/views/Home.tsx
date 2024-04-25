import React from 'react'
import "./home.css";

function Card({
    children
}:{
    children:JSX.Element|JSX.Element[]
}){
    return (
        <div className='card'>
            {children}
        </div>
    )
}

export default function Home() {
  return (
    <div id="home-page-container">
        <div id='row-1'>
            <Card>
                <h3>View QA Results</h3>
            </Card>
        </div>
    </div>
  )
}
