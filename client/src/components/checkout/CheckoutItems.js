import React, { useState } from 'react'
import CheckoutCard from './CheckoutCard'
import {
    CardElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";


function CheckoutItems() {
    const [creditCardClicked, setCreditCardClicked] = useState(false)
    const [googlePayClicked, setGooglePayClicked] = useState(false)
    const [applePayClicked, setApplePayClicked] = useState(false)
    const [paypalClicked, setPaypalClicked] = useState(false)

    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState('');
    const stripe = useStripe();
    const elements = useElements();

    const handleCardSubmit = async ev => {
        ev.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        });

        if (payload.error) {
            setError(`Payment failed ${payload.error.message}`);
            setProcessing(false);
        } else {
            setError(null);
            setProcessing(false);
            setSucceeded(true);
        }
    };

    const handleChange = async (event) => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    };

    const handleInputChange = (e) => {
        if (e.target.value === 'cards') {
            setCreditCardClicked(true);
            setGooglePayClicked(false);
            setApplePayClicked(false)
            setPaypalClicked(false)
        } else if (e.target.value === 'googlePay') {
            setCreditCardClicked(false);
            setGooglePayClicked(true);
            setApplePayClicked(false)
            setPaypalClicked(false)
        } else if (e.target.value === 'applePay') {
            setGooglePayClicked(false);
            setCreditCardClicked(false);
            setApplePayClicked(true)
            setPaypalClicked(false)
        } else if (e.target.target === 'paypal') {
            setGooglePayClicked(true);
            setCreditCardClicked(false);
            setApplePayClicked(false)
            setPaypalClicked(true)
        }
    }
    return (

        <form>

            <div className="paymentForm">
                <CheckoutCard
                    handleInputChange={handleInputChange}
                    creditCardClicked={creditCardClicked}
                    error={error}
                    succeeded={succeeded}
                    handleChange={handleChange}
                    setClientSecret={setClientSecret}
                />

                <div className="borderTop">
                    <input className="checkoutInputWallets" type="radio" id="googlePay" name="checkoutOption" value="googlePay" onChange={handleInputChange} />
                    <label htmlFor="googlePay">
                        <img className="walletSVG" src="/checkout_pics/googlePay.svg" alt="Google Pay"/>
                    </label>
                </div>

                <div className="borderTop">
                    <input className="checkoutInputWallets" type="radio" id="applePay" name="checkoutOption" value="applePay" onChange={handleInputChange} />
                    <label htmlFor="applePay">
                        <img className="walletSVG" src="/checkout_pics/applePay.svg" alt='Apple Pay' />
                    </label>
                </div>

                <div className="borderTop">
                    <input className="checkoutInputWallets" type="radio" id="paypal" name="checkoutOption" value="paypal" onChange={handleInputChange} />
                    <label htmlFor="paypal">
                        <img className="paypalSVG" src="/checkout_pics/paypal.svg" alt="Paypal" />
                    </label>
                </div>
            </div>

            <button
                disabled={processing || disabled || succeeded}
                id="resultButton"
                onClick={handleCardSubmit}
            >
                <span id="button-text">
                    {processing ? (
                        <div className="spinner" id="spinner"></div>
                    ) : (
                        "GET MY IQ RESULTS"
                    )}
                </span>
            </button>
        </form>
    )
}

export default CheckoutItems
