import React from 'react'
import { Link } from 'react-router-dom'
import Stats from '../components/Stats'
import Sidebar from './Sidebar'

const Home = () => {
    return (
        <div className="page-container">
            <Sidebar />
            <div className="home">
                <div className="card">
                    <h1 className="card-header">Universal IQ test <img className="diamond" alt="Diamond approved" src="/diamond.svg" /> </h1>
                    <div className="card-body">
                        <div className="main-text">
                        <p className="text-danger"><b>Warning:</b> You can take this test only once. Once you start the test you can't retake the test anymore.</p>
                        <p><b>Before you take the test make sure you are in a quiet place and you can concentrate. Once you chose an answer you can't change it anymore.</b></p>
                        <p>Using 40 questions, we will assess your ability to learn, understand, form concepts, process information, and apply logic and reason.</p>
                        <p>Your test result will inform you about your IQ in your age category, how well you did within your continent, the world population, your study level and your study area</p>
                        <p>If you are ready click the button below.</p>
                        <div className="center">
                            <Link className="btn" to="/iq-test-app">Start the IQ test</Link>
                        </div>
                        </div>
                    </div>
                </div>
                <Stats />
            </div>
        </div>
    )
}

export default Home
