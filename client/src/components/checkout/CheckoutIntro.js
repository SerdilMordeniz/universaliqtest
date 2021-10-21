import React from 'react'
import { useHistory } from 'react-router-dom'

function CheckoutIntro() {
    let history = useHistory()

    const amount = history.location.state.convertedCurrencyAmount;
    const currency = history.location.state.currency;
    const languageCode = history.location.state.languages;
    const countryCode = history.location.state.code;
    const formattedAmount = new Intl.NumberFormat(`${languageCode}-${countryCode}`, { style: 'currency', currency: currency }).format(amount);

    return (
        <div>
            <img className="lock" height='14' src='/lock.png' alt="lock" />
            <p>All transactions are secure and encrypted. Credit card information is never saved!</p>
            <p><strong>Country: </strong>{history.location.state.name} <img className="checkoutFlag" alt={`${history.location.state.code}`} src={`http://purecatamphetamine.github.io/country-flag-icons/1x1/${history.location.state.code}.svg`} /></p>
            <p><strong>Price: {formattedAmount}</strong></p>
            <p>How do you want to pay?</p>
        </div>
    )
}

export default CheckoutIntro
