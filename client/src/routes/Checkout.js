import React from 'react'
import { useHistory } from 'react-router-dom'
import CheckoutForm from '../components/checkout/CheckoutForm'

function Checkout() {
    let history = useHistory()

    const calculateAgeBrackets = (ageCategory) => {
        switch (ageCategory) {
            case 'Youth':
                return '12 - 18'
            case 'Young Adult':
                return '19 - 35'
            case 'Adult':
                return '36 - 65'
            case 'Senior':
                return '66 - 100'
            default:
        }
    }

    return (
        <div className="card">
            <h1>Verfication: In order for us to be sure that you took our test seriously we need you to pay 5$.</h1>
            <p>To make sure our statistics don't get inflated with false results we need you to pay 5$. If we make this test free a lot of
                people will take this test several times which will make all of the results inaccurate. On top of that computer bots are
                crawling this website and would skew our database even more.
            </p>
            <p>We calculate the IQ with real data from real people. Statistically the average IQ is 100 and the standard deviation is 15.</p>
            <p><strong>You will be automatically redirected to your verified result after your payment.</strong></p>

            <CheckoutForm />

            <h2>This is what you will get <strong>{history.location.state.pseudonym}</strong>: </h2>
            <ul className="benefits">
                <li>Your IQ score according to all the tests taken</li>
                <li>Your IQ score according to your age category </li>
                <li>Chart with time spent on each item</li>
                <li>Your ranking worldwide</li>
                <li>Your ranking in relation to your age category ({history.location.state.age_category}: {calculateAgeBrackets(history.location.state.age_category)} years old)</li>
                <li>Your ranking according to your study area ({history.location.state.study_area}) </li>
                <li>Your ranking according to your study level ({history.location.state.study_level})</li>
            </ul>
        </div>
    )
}

export default Checkout

