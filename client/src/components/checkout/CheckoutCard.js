import React from 'react'
import {
    CardElement,
} from "@stripe/react-stripe-js";

function CheckoutCard({creditCardClicked, handleInputChange, handleChange, error, succeeded}) {

    const cardStyle = {
        style: {
            base: {
                color: "#32325d",
                fontFamily: 'Roboto, sans-serif',
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                    color: "#32325d"
                }
            },
            invalid: {
                color: "#fa755a",
                iconColor: "#fa755a"
            }
        }
    };

    return (
        <div className="cards">
            <input className="checkoutInput" type="radio" id="cards" name="checkoutOption" value="cards" onChange={handleInputChange} />
            <label htmlFor="cards">
                <strong>Credit Card</strong>
                <img className="checkoutSVG" src="/checkout_pics/visa.svg" alt="visa" />
                <img className="checkoutSVG" src="/checkout_pics/mastercard.svg" alt="Mastercard" />
                <img className="checkoutSVG lastCheckoutSVG" src="/checkout_pics/amex.svg" alt="American Express" />
                <i id="andMore">and more...</i>
            </label>
            {
                creditCardClicked &&
                <div id="payment-form">
                    <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
                    {/* Show any error that happens when processing the payment */}
                    {error && (
                        <div className="card-error" role="alert">
                            {error}
                        </div>
                    )}
                    {/* Show a success message upon completion */}
                    <p className={succeeded ? "result-message" : "result-message hidden"}>
                        Payment succeeded, see the result in your
                        <a
                            href={`https://dashboard.stripe.com/test/payments`}
                        >
                            {" "}
                            Stripe dashboard.
                        </a> Refresh the page to pay again.
                    </p>
                </div>
            }
        </div>
    )
}

export default CheckoutCard
