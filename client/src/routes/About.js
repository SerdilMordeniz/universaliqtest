import React from 'react'
import Sidebar from './Sidebar'

function About() {
    return (
        <div className="home1">
            <Sidebar />
            <div className="card">
                <h1>About Universaliqtest</h1>
                <p>Universaliqtest is a private comppany. We created a universal iq test that is
                assessing ones mental ability. The test consists of questions where no language
                or any other cultural background would be necessary. Our test has 49 questions.
                This usually takes our customers about 45 mins to answer. At the end of the test
                we give your intelligence quotient (IQ) in your age category. Furthermore we also
                compare your mental ability within your continent (continent IQ), how well you did compared
                to everyone (worldwide IQ), how well you did in your study level (Study Level IQ) and
                within your study area (study area IQ).
                We don't store any private information about a client.
                The clients privacy is very important to us.
            </p>
            </div>
        </div>
    )
}

export default About
