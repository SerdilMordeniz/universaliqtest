import React, { useState, useEffect } from 'react'
import CheckoutCard from './CheckoutCard'
import CheckoutSofort from './CheckoutSofort'
import CheckoutBancontact from './CheckoutBancontact'
import EpsBankSection from './EpsBankSection'
import CheckoutGiropay from './CheckoutGiropay'
import IdealBankSection from './IdealBankSection'
import P24BankSection from './P24BankSection'
import CheckoutPaypal from './CheckoutPaypal'
import {
    CardElement,
    useStripe,
    useElements,
    EpsBankElement,
    IdealBankElement,
    P24BankElement
} from "@stripe/react-stripe-js"
import { useHistory } from 'react-router-dom'
import iqTestAPI from '../../apis/iqTestAPI'
import { useTranslation } from 'react-i18next'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"

const paypalCurrencies = ['AUD', 'CAD', 'CZK', 'DKK', 'EUR', 'HKD', 'ILS', 'MXN', 'NZD', 'NOK', 'PHP', 'PLN', 'GBP', 'RUB', 'SGD', 'SEK', 'CHF', 'THB', 'USD'];
const availableSofortCountries = ['at', 'be', 'de', 'it', 'nl', 'es'];

function CheckoutItems() {
    const [paypalAmount, setPaypalAmount] = useState('5.99')
    const [paypalCurrency, setPaypalCurrency] = useState('')
    const [sofortCountry, setSofortCountry] = useState('')
    const [fullName, setFullName] = useState('')
    const [currency, setCurrency] = useState('')
    const [countryCode, setCountryCode] = useState('')

    const [paymentIntent, setPaymentIntent] = useState(false)

    const { i18n } = useTranslation();
    const [creditCardClicked, setCreditCardClicked] = useState(false)
    const [paypalClicked, setPaypalClicked] = useState(false)
    const [sofortClicked, setSofortClicked] = useState(false)
    const [bancontactClicked, setBancontactClicked] = useState(false)
    const [epsBankClicked, setEpsBankClicked] = useState(false)
    const [giropayClicked, setGiropayClicked] = useState(false)
    const [idealBankClicked, setIdealBankClicked] = useState(false)
    const [p24Clicked, setP24Clicked] = useState(false)

    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState('');
    const stripe = useStripe();
    const elements = useElements();

    let history = useHistory()
    let state = history.location.state;

    useEffect(() => {
        if(paypalCurrencies.includes(currency)) {
            setPaypalCurrency(currency);
            setPaypalAmount(parseFloat((state.convertedCurrencyAmount)));
        } else {
            setPaypalCurrency('EUR');
            setPaypalAmount(5);
        }

    }, [currency, state.convertedCurrencyAmount])

    useEffect(() => {
        setCurrency(state.currency);
        setCountryCode(state.code);
        console.log(state)
    }, [state])

    useEffect(() => {
        // Create PaymentIntent as soon as the credit card is clicked. But not when it already exists.
        if ((creditCardClicked || sofortClicked || bancontactClicked || epsBankClicked || giropayClicked || idealBankClicked || p24Clicked) && !paymentIntent) {
            window
                .fetch("http://localhost:3001/create-payment-intent", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        items: [{ id: "IQ-test" }],
                        currency: state.currency,
                        country_code: state.code,
                        convertedCurrencyAmount: state.convertedCurrencyAmount,
                        availableSofortCountries: availableSofortCountries

                    })
                })
                .then(res => {
                    return res.json();
                })
                .then(data => {
                    setClientSecret(data.clientSecret);
                    setPaymentIntent(data.paymentIntent);
                });
        }
    }, [creditCardClicked, setClientSecret, sofortClicked, bancontactClicked, epsBankClicked, giropayClicked, idealBankClicked, p24Clicked, paymentIntent, state.code, state.convertedCurrencyAmount, state.currency]);

    useEffect(() => {
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
                    study_area: state.study_area,

                    paypalAmount: paypalAmount,
                    language_code: i18n.language
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

    const handleSofortSubmit = async (event) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        const { error } = await stripe.confirmSofortPayment(clientSecret, {
            payment_method: {
                sofort: {
                    country: sofortCountry
                },
                billing_details: {
                    email: state.e_mail
                },
            },
            return_url: `http://localhost:3001/success-page?pseudonym=${state.pseudonym}&e_mail=${state.e_mail}&gender=${state.gender}&age=${state.age}&age_category=${state.age_category}&ip_address=${state.ip_address}&code=${state.code}&name=${state.name}&continent_code=${state.continent_code}&languages=${state.languages}&total_time_taken=${state.total_time_taken}&number_of_correct_answers=${state.number_of_correct_answers}&time_for_each_item=${state.time_for_each_item}&date=${state.date}&study_level=${state.study_level}&study_area=${state.study_area}&paypalAmount=${paypalAmount}&language_code=${i18n.language}`,
        },
        );

        if (error) {
            // Show error to your customer.
            console.log(error.message);
        }

        // Otherwise the customer will be redirected away from your
        // page to complete the payment with their bank.
    };

    const handleBancontactSubmit = async (event) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        const { error } = await stripe.confirmBancontactPayment(clientSecret, {
            payment_method: {
                billing_details: {
                    name: fullName,
                },
            },
            return_url: `http://localhost:3001/success-page?pseudonym=${state.pseudonym}&e_mail=${state.e_mail}&gender=${state.gender}&age=${state.age}&age_category=${state.age_category}&ip_address=${state.ip_address}&code=${state.code}&name=${state.name}&continent_code=${state.continent_code}&languages=${state.languages}&total_time_taken=${state.total_time_taken}&number_of_correct_answers=${state.number_of_correct_answers}&time_for_each_item=${state.time_for_each_item}&date=${state.date}&study_level=${state.study_level}&study_area=${state.study_area}&paypalAmount=${paypalAmount}&language_code=${i18n.language}`,
        });

        if (error) {
            // Show error to your customer.
            console.log(error.message);
        }

        // Otherwise the customer will be redirected away from your
        // page to complete the payment with their bank.
    };

    const handleEpsBankSubmit = async (event) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();
        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        const epsBank = elements.getElement(EpsBankElement);

        const { error } = await stripe.confirmEpsPayment(clientSecret, {
            payment_method: {
                eps: epsBank,
                billing_details: {
                    name: fullName,
                },
            },
            return_url: `http://localhost:3001/success-page?pseudonym=${state.pseudonym}&e_mail=${state.e_mail}&gender=${state.gender}&age=${state.age}&age_category=${state.age_category}&ip_address=${state.ip_address}&code=${state.code}&name=${state.name}&continent_code=${state.continent_code}&languages=${state.languages}&total_time_taken=${state.total_time_taken}&number_of_correct_answers=${state.number_of_correct_answers}&time_for_each_item=${state.time_for_each_item}&date=${state.date}&study_level=${state.study_level}&study_area=${state.study_area}&paypalAmount=${paypalAmount}&language_code=${i18n.language}`,
        });

        if (error) {
            // Show error to your customer.
            console.log(error.message);
        }

        // Otherwise the customer will be redirected away from your
        // page to complete the payment with their bank.
    };

    const handleGiropaySubmit = async (event) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();
        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        const { error } = await stripe.confirmGiropayPayment(clientSecret, {
            payment_method: {
                billing_details: {
                    name: fullName,
                },
            },
            return_url: `http://localhost:3001/success-page?pseudonym=${state.pseudonym}&e_mail=${state.e_mail}&gender=${state.gender}&age=${state.age}&age_category=${state.age_category}&ip_address=${state.ip_address}&code=${state.code}&name=${state.name}&continent_code=${state.continent_code}&languages=${state.languages}&total_time_taken=${state.total_time_taken}&number_of_correct_answers=${state.number_of_correct_answers}&time_for_each_item=${state.time_for_each_item}&date=${state.date}&study_level=${state.study_level}&study_area=${state.study_area}&paypalAmount=${paypalAmount}&language_code=${i18n.language}`,
        });

        if (error) {
            // Show error to your customer.
            console.log(error.message);
        }

        // Otherwise the customer will be redirected away from your
        // page to complete the payment with their bank.
    };

    const handleIdealBankSubmit = async (event) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        const idealBank = elements.getElement(IdealBankElement);

        // For brevity, this example is using uncontrolled components for
        // the accountholder's name. In a real world app you will
        // probably want to use controlled components.
        // https://reactjs.org/docs/uncontrolled-components.html
        // https://reactjs.org/docs/forms.html#controlled-components



        const { error } = await stripe.confirmIdealPayment(clientSecret, {
            payment_method: {
                ideal: idealBank,
            },
            return_url: `http://localhost:3001/success-page?pseudonym=${state.pseudonym}&e_mail=${state.e_mail}&gender=${state.gender}&age=${state.age}&age_category=${state.age_category}&ip_address=${state.ip_address}&code=${state.code}&name=${state.name}&continent_code=${state.continent_code}&languages=${state.languages}&total_time_taken=${state.total_time_taken}&number_of_correct_answers=${state.number_of_correct_answers}&time_for_each_item=${state.time_for_each_item}&date=${state.date}&study_level=${state.study_level}&study_area=${state.study_area}&paypalAmount=${paypalAmount}&language_code=${i18n.language}`,
        });

        if (error) {
            // Show error to your customer.
            console.log(error.message);
        }

        // Otherwise the customer will be redirected away from your
        // page to complete the payment with their bank.
    };

    const handleP24BankSubmit = async (event) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();
        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        const p24Bank = elements.getElement(P24BankElement);

        // For brevity, this example is using uncontrolled components for
        // the accountholder's name. In a real world app you will
        // probably want to use controlled components.
        // https://reactjs.org/docs/uncontrolled-components.html
        // https://reactjs.org/docs/forms.html#controlled-components
        const { error } = await stripe.confirmP24Payment(clientSecret, {
            payment_method: {
                p24: p24Bank,
                billing_details: {
                    email: state.e_mail
                },
            },
            payment_method_options: {
                p24: {
                    // In order to be able to pass the `tos_shown_and_accepted` parameter, you must
                    // ensure that the P24 regulations and information obligation consent
                    // text is clearly in the view of the customer. See
                    // stripe.com/docs/payments/p24/accept-a-payment#requirements
                    // for directions.
                    tos_shown_and_accepted: true,
                }
            },
            return_url: `http://localhost:3001/success-page?pseudonym=${state.pseudonym}&e_mail=${state.e_mail}&gender=${state.gender}&age=${state.age}&age_category=${state.age_category}&ip_address=${state.ip_address}&code=${state.code}&name=${state.name}&continent_code=${state.continent_code}&languages=${state.languages}&total_time_taken=${state.total_time_taken}&number_of_correct_answers=${state.number_of_correct_answers}&time_for_each_item=${state.time_for_each_item}&date=${state.date}&study_level=${state.study_level}&study_area=${state.study_area}&paypalAmount=${paypalAmount}&language_code=${i18n.language}`,
        });

        if (error) {
            // Show error to your customer.
            console.log(error.message);
        }

        // Otherwise the customer will be redirected away from your
        // page to complete the payment with their bank.
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
            setSofortClicked(false);
            setBancontactClicked(false);
            setEpsBankClicked(false);
            setGiropayClicked(false);
            setIdealBankClicked(false);
            setP24Clicked(false);
        } else if (e.target.value === 'paypal') {
            setCreditCardClicked(false);
            setPaypalClicked(true);
            setSofortClicked(false);
            setBancontactClicked(false);
            setEpsBankClicked(false);
            setGiropayClicked(false);
            setIdealBankClicked(false);
            setP24Clicked(false);
        } else if (e.target.value === 'sofort') {
            setCreditCardClicked(false);
            setPaypalClicked(false);
            setSofortClicked(true);
            setBancontactClicked(false);
            setEpsBankClicked(false);
            setGiropayClicked(false);
            setIdealBankClicked(false);
            setP24Clicked(false);
        } else if (e.target.value === 'bancontact') {
            setCreditCardClicked(false);
            setPaypalClicked(false);
            setSofortClicked(false);
            setBancontactClicked(true);
            setEpsBankClicked(false);
            setGiropayClicked(false);
            setIdealBankClicked(false);
            setP24Clicked(false);
        } else if (e.target.value === 'epsBank') {
            setCreditCardClicked(false);
            setPaypalClicked(false);
            setSofortClicked(false);
            setBancontactClicked(false);
            setEpsBankClicked(true);
            setGiropayClicked(false);
            setIdealBankClicked(false);
            setP24Clicked(false);
        } else if (e.target.value === 'giropay') {
            setCreditCardClicked(false);
            setPaypalClicked(false);
            setSofortClicked(false);
            setBancontactClicked(false);
            setEpsBankClicked(false);
            setGiropayClicked(true);
            setIdealBankClicked(false);
            setP24Clicked(false);
        } else if (e.target.value === 'ideal') {
            setCreditCardClicked(false);
            setPaypalClicked(false);
            setSofortClicked(false);
            setBancontactClicked(false);
            setEpsBankClicked(false);
            setGiropayClicked(false);
            setIdealBankClicked(true);
            setP24Clicked(false);
        } else if (e.target.value === 'p24Bank') {
            setCreditCardClicked(false);
            setPaypalClicked(false);
            setSofortClicked(false);
            setBancontactClicked(false);
            setEpsBankClicked(false);
            setGiropayClicked(false);
            setIdealBankClicked(false);
            setP24Clicked(true);
        } else if (e.target.value === 'googlePay') {
            setCreditCardClicked(false);
            setPaypalClicked(false);
            setSofortClicked(false);
            setBancontactClicked(false);
            setEpsBankClicked(false);
            setGiropayClicked(false);
            setIdealBankClicked(false);
            setP24Clicked(false);
        } else if (e.target.value === 'applePay') {
            setCreditCardClicked(false);
            setPaypalClicked(false);
            setSofortClicked(false);
            setBancontactClicked(false);
            setEpsBankClicked(false);
            setGiropayClicked(false);
            setIdealBankClicked(false);
            setP24Clicked(false);
        }
    }

    const handleSofortCountryChange = (e) => {
        setSofortCountry(e.target.value)
    }

    if (currency && countryCode) {
        return (

            <form>
                <div className="paymentForm">
                    <CheckoutCard
                        handleInputChange={handleInputChange}
                        creditCardClicked={creditCardClicked}
                        error={error}
                        succeeded={succeeded}
                        handleChange={handleChange}
                    />

                    <CheckoutPaypal
                        handleInputChange={handleInputChange}
                        paypalClicked={paypalClicked}
                    />

                    {(currency.toLowerCase() === 'eur') && (availableSofortCountries.includes(countryCode.toLowerCase())) &&
                        <CheckoutSofort
                            handleInputChange={handleInputChange}
                            sofortClicked={sofortClicked}
                            handleSofortCountryChange={handleSofortCountryChange}
                        />
                    }

                    {(currency.toLowerCase() === 'eur') && (countryCode.toLowerCase() === 'be') &&
                        <CheckoutBancontact
                            handleInputChange={handleInputChange}
                            bancontactClicked={bancontactClicked}
                            setFullName={setFullName}

                        />
                    }

                    {(currency.toLowerCase() === 'eur') && (countryCode.toLowerCase() === 'at') &&
                        <EpsBankSection
                            handleInputChange={handleInputChange}
                            epsBankClicked={epsBankClicked}
                            setFullName={setFullName}
                        />
                    }


                    {(currency.toLowerCase() === 'eur') && (countryCode.toLowerCase() === 'de') &&
                        <CheckoutGiropay
                            handleInputChange={handleInputChange}
                            giropayClicked={giropayClicked}
                            setFullName={setFullName}
                        />
                    }


                    {(currency.toLowerCase() === 'eur') && (countryCode.toLowerCase() === 'nl') &&
                        <IdealBankSection
                            handleInputChange={handleInputChange}
                            idealBankClicked={idealBankClicked}
                            setFullName={setFullName}
                        />
                    }

                    {(currency.toLowerCase() === 'eur' || 'pln') && (countryCode.toLowerCase() === 'pl') &&
                        <P24BankSection
                            handleInputChange={handleInputChange}
                            p24Clicked={p24Clicked}
                        />
                    }
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
                    <PayPalScriptProvider options={{ "client-id": "AalkCw5fCXcb-Z4sT8GxdvJkxVdr1oXik6Xd1P7bfzQ5X9eqfgFlJgSKr46R4T7ZK81l1UoRmJMn84jV",
                                                        currency: paypalCurrency,
                                                        intent: "capture",
                                                    }}>
                        <PayPalButtons style={{ layout: "horizontal" }}
                            createOrder={(data, actions) => {
                                return actions.order.create({
                                    purchase_units: [
                                        {
                                            amount: {
                                                value: paypalAmount,
                                            },
                                        },
                                    ],
                                    application_context: {
                                        shipping_preference: "NO_SHIPPING"
                                    }

                                });
                            }}

                            onApprove={function (data, actions) {
                                // This function captures the funds from the transaction.
                                return actions.order.capture().then(function (details) {
                                    // This function shows a transaction success message to your buyer.
                                    setSucceeded(true)
                                });
                            }}

                        />

                    </PayPalScriptProvider>
                }
                
                {/* Sofort Button */}
                {sofortClicked &&
                    <button
                        disabled={!stripe}
                        id="resultButton"
                        onClick={handleSofortSubmit}
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

                {/* Bancontact Button */}
                {bancontactClicked &&
                    <button
                        disabled={!stripe}
                        id="resultButton"
                        onClick={handleBancontactSubmit}
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

                {/* EPS Bank Button */}
                {epsBankClicked &&
                    <button
                        disabled={!stripe}
                        id="resultButton"
                        onClick={handleEpsBankSubmit}
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

                {/* Giropay Button */}
                {giropayClicked &&
                    <button
                        disabled={!stripe}
                        id="resultButton"
                        onClick={handleGiropaySubmit}
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

                {/* Ideal Bank Button */}
                {idealBankClicked &&
                    <button
                        disabled={!stripe}
                        id="resultButton"
                        onClick={handleIdealBankSubmit}
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

                {/* Ideal Bank Button */}
                {p24Clicked &&
                    <button
                        disabled={!stripe}
                        id="resultButton"
                        onClick={handleP24BankSubmit}
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

            </form>
        )
    } else return (
        <div>Loading...</div>
    )
}

export default CheckoutItems
