import React from 'react'

function CheckoutPaypal( {handleInputChange, paypalClicked} ) {
    return (
        <div className="borderTop">
            <input className="checkoutInputWallets" type="radio" id="paypals" name="checkoutOption" value="paypal" onChange={handleInputChange} />
            <label htmlFor="paypals">
                <img className="paypalSVG" src="/checkout_pics/paypal.svg" alt="Paypal Pay" />
            </label>
            {paypalClicked &&
                <div className="checkoutSection">
                    <p>
                        You will be forwarded to Paypal to complete the payment process.
                    </p>
                </div>
            }

        </div>
    )
}

export default CheckoutPaypal
