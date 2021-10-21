/**
* Use the CSS tab above to style your Element's container.
*/
import React from 'react';
import { P24BankElement } from '@stripe/react-stripe-js';

const P24_ELEMENT_OPTIONS = {
    // Custom styling can be passed to options when creating an Element
    style: {
        base: {
            padding: '10px 12px',
            color: '#32325d',
            fontSize: '16px',
            '::placeholder': {
                color: '#aab7c4'
            },
        },
    },
};

function P24BankSection({ handleInputChange, p24Clicked }) {
    return (
        <div className="borderTop">
            <input className="checkoutInputWallets" type="radio" id="p24Bank" name="checkoutOption" value="p24Bank" onChange={handleInputChange} />
            <label htmlFor="p24Bank">
                <img className="p24SVG" src="/checkout_pics/p24.svg" alt="p24 Bank" />
            </label>

            {p24Clicked &&
                <div className="checkoutSection">
                    <p>
                        You will be forwarded to Przelewy24 bank to complete the payment process. <br/>
                        Select your bank:
                    </p>
                    <P24BankElement options={P24_ELEMENT_OPTIONS} />
                </div>
            }
        </div>
    );
};

export default P24BankSection;