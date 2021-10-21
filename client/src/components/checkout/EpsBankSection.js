import React from 'react'
import { EpsBankElement } from '@stripe/react-stripe-js';

const EPS_ELEMENT_OPTIONS = {
    // Custom styling can be passed to options when creating an Element
    style: {
        base: {
            padding: '10px 12px',
            color: '#32325d',
            fontSize: '14px',
            '::placeholder': {
                color: '#aab7c4'
            },
        },
    },
};

function EpsBankSection({ handleInputChange, epsBankClicked, setFullName }) {
    return (
        <div className="borderTop epsBank">
            <input className="checkoutInputWallets" type="radio" id="epsBank" name="checkoutOption" value="epsBank" onChange={handleInputChange} />
            <label htmlFor="epsBank">
                <img className="epsSVG" src="/checkout_pics/eps.svg" alt="EPS Bank" />
            </label>
            
            {epsBankClicked &&
            <div className="checkoutSection">
                <p>
                    In order for you to pay with EPS, they need your full name and your bank's name. <br/>
                    You will be forwarded to EPS bank to complete the payment process.
                </p>

                <label htmlFor='fullName'>Your full name: </label> 
                <input placeholder='John Doe' type='text' onChange={(e) => setFullName(e.target.value)} name='fullName' />
                <EpsBankElement options={EPS_ELEMENT_OPTIONS} />

            </div>
            }

        </div>
    );
}

export default EpsBankSection
