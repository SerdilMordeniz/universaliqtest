import React from 'react'
import CheckoutItems from './CheckoutItems'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe("pk_test_51IkoZhABViR74PKsaGYgp00fcpgGOi4mJRpymTyaVI9ECpDUGJwkmi6yuKjocDLUfFDseeFECqOO1FExUFK0Xi8n00TYSd8Ndp");

function CheckoutAccordion() {
    return (
        <div>
            <Elements stripe={promise}>
                <CheckoutItems />
            </Elements>
        </div>
    )
}

export default CheckoutAccordion
