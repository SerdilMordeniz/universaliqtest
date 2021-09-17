import React from 'react'
import CheckoutAccordion from './CheckoutAccordion'
import CheckoutIntro from './CheckoutIntro'

function CheckoutForm() {
    
    return (
        <div className="checkoutForm">
            <CheckoutIntro />
            <CheckoutAccordion />
        </div>
    )
}

export default CheckoutForm
