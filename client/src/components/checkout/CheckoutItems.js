import React, { useState, useEffect } from 'react'
import CheckoutCard from './CheckoutCard'
import {
    CardElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import { useHistory } from 'react-router-dom'
import iqTestAPI from '../../apis/iqTestAPI'
import { useTranslation } from 'react-i18next'
import {  PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";


function CheckoutItems() {
    const [{ isResolved }] = usePayPalScriptReducer();

    const { i18n } = useTranslation();
    const [creditCardClicked, setCreditCardClicked] = useState(false)
    const [paypalClicked, setPaypalClicked] = useState(false)
    const [googlePayClicked, setGooglePayClicked] = useState(false)
    const [applePayClicked, setApplePayClicked] = useState(false)

    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState('');
    const stripe = useStripe();
    const elements = useElements();

    let history = useHistory()
    let state = history.location.state;

    const handlePostDetails = async () => {
        if (succeeded) {
            const results = await iqTestAPI.post('/iqtest', {
                pseudonym: state.pseudonym,
                e_mail: state.e_mail,
                gender: state.gender,

                age: state.age,
                age_category: state.age_category,

                ip_address: state.ip_address,
                code: state.code,
                name: state.name,
                continent_code: state.continent_code,
                languages: state.languages,

                total_time_taken: state.total_time_taken,
                number_of_correct_answers: state.number_of_correct_answers,
                time_for_each_item: state.time_for_each_item,
                date: new Date(),

                study_level: state.study_level,
                study_area: state.study_area
            })

            history.push({ pathname: `/${i18n.language}/results/${results.data.personal_id.personal_id}` })
        }
    }

    useEffect(() => {
        const handlePostDetails = async () => {
            if (succeeded || isResolved) {
                const results = await iqTestAPI.post('/iqtest', {
                    pseudonym: state.pseudonym,
                    e_mail: state.e_mail,
                    gender: state.gender,

                    age: state.age,
                    age_category: state.age_category,

                    ip_address: state.ip_address,
                    code: state.code,
                    name: state.name,
                    continent_code: state.continent_code,
                    languages: state.languages,

                    total_time_taken: state.total_time_taken,
                    number_of_correct_answers: state.number_of_correct_answers,
                    time_for_each_item: state.time_for_each_item,
                    date: new Date(),

                    study_level: state.study_level,
                    study_area: state.study_area
                })

                history.push({ pathname: `/${i18n.language}/results/${results.data.personal_id.personal_id}` })
                window.location.reload()
            }
        }
        handlePostDetails();
    })



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
        console.log(e.target.value)
        if (e.target.value === 'cards') {
            setCreditCardClicked(true);
            setPaypalClicked(false);
            setGooglePayClicked(false);
            setApplePayClicked(false);
        } else if (e.target.value === 'paypal') {
            setCreditCardClicked(false);
            setPaypalClicked(true);
            setGooglePayClicked(false);
            setApplePayClicked(false);
        } else if (e.target.value === 'googlePay') {
            setCreditCardClicked(false);
            setPaypalClicked(false);
            setGooglePayClicked(true);
            setApplePayClicked(false);
        } else if (e.target.value === 'applePay') {
            setCreditCardClicked(false);
            setPaypalClicked(false);
            setGooglePayClicked(false);
            setApplePayClicked(true);
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
                    <input className="checkoutInputWallets" type="radio" id="paypals" name="checkoutOption" value="paypal" onChange={handleInputChange} />
                    <label htmlFor="paypals">
                        <img className="paypalSVG" src="/checkout_pics/paypal.svg" alt="Paypal Pay" />
                    </label>
                </div>

                <div className="borderTop">
                    <input className="checkoutInputWallets" type="radio" id="googlePay" name="checkoutOption" value="googlePay" onChange={handleInputChange} />
                    <label htmlFor="googlePay">
                        <img className="walletSVG" src="/checkout_pics/googlePay.svg" alt="Google Pay" />
                    </label>
                </div>

                <div className="borderTop">
                    <input className="checkoutInputWallets" type="radio" id="applePay" name="checkoutOption" value="applePay" onChange={handleInputChange} />
                    <label htmlFor="applePay">
                        <img className="walletSVG" src="/checkout_pics/applePay.svg" alt='Apple Pay' />
                    </label>
                </div>
            </div>

            {/* Card Button */}
            {creditCardClicked &&
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
            }

            {/* Paypal Button */}
            {paypalClicked && 
                    <PayPalButtons style={{ layout: "horizontal" }} 
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            purchase_units: [
                                {
                                    amount: {
                                        value: "5.99",
                                    },
                                },
                            ],
                        });
                    }}
                    />
            }
        </form>
    )
}

export default CheckoutItems
