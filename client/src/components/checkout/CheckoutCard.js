import React, { useEffect } from 'react'
import {
    CardElement,
} from "@stripe/react-stripe-js";

function CheckoutCard(props) {

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        window
            .fetch("http://localhost:3001/create-payment-intent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ items: [{ id: "IQ-test" }] })
            })
            .then(res => {
                return res.json();
            })
            .then(data => {
                props.setClientSecret(data.clientSecret);
            });
            
    }, []);

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
            <input className="checkoutInput" type="radio" id="cards" name="checkoutOption" value="cards" onChange={props.handleInputChange} />
            <label htmlFor="cards">
                <strong>Credit Card</strong>
                <img className="checkoutSVG" src="/checkout_pics/visa.svg" alt="visa" />
                <img className="checkoutSVG" src="/checkout_pics/mastercard.svg" alt="Mastercard" />
                <img className="checkoutSVG lastCheckoutSVG" src="/checkout_pics/amex.svg" alt="American Express" />
                <i id="andMore">and more...</i>
            </label>
            {
                props.creditCardClicked &&
                <div id="payment-form">
                    <CardElement id="card-element" options={cardStyle} onChange={props.handleChange} />
                    {/* Show any error that happens when processing the payment */}
                    {props.error && (
                        <div className="card-error" role="alert">
                            {props.error}
                        </div>
                    )}
                    {/* Show a success message upon completion */}
                    <p className={props.succeeded ? "result-message" : "result-message hidden"}>
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
