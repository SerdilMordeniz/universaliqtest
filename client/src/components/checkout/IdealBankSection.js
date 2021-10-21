/**
* Use the CSS tab above to style your Element's container.
*/
import React from 'react';
import { IdealBankElement } from '@stripe/react-stripe-js';

const IDEAL_ELEMENT_OPTIONS = {
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

function IdealBankSection({ handleInputChange, idealBankClicked, setFullName }) {
    return (
        <div className="borderTop">
            <div className="idealBank">
                <input className="checkoutInputWallets" type="radio" id="ideal" name="checkoutOption" value="ideal" onChange={handleInputChange} />
                <label htmlFor="ideal">
                    <img className="idealSVG" src="/checkout_pics/ideal.svg" alt="Ideal Bank" />
                </label>
                {idealBankClicked &&
                    <div className="checkoutSection">
                        <p>
                            You will be forwarded to iDEAL Bank to complete the payment process. <br />
                            Select your bank:
                        </p>
                        <IdealBankElement options={IDEAL_ELEMENT_OPTIONS} />
                    </div>
                }
            </div>
        </div>
    );
};

export default IdealBankSection;