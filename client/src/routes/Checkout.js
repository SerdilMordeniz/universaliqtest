import React from 'react'

function Checkout() {
    return (
        <div className="card">
            <h1>Verfication: In order for us to be somewhat sure that you took our test seriously we need you to pay 5$.</h1>
            <p>To make sure our statistics don't get inflated with false results we need you to pay 5$. If we make this test free a lot of
                people will take this test several times which will make all of the results inaccurate. On top of that computer bots are
                crawling this website and would skew our database even more.
            </p>
            <p>We calculate the IQ with real data from real people. Statistically the average IQ is 100 and the standard deviation is 15.</p>
            <p><strong>You will be automatically redirected to your verified result after your payment.</strong></p>
        </div>
    )
}

export default Checkout

