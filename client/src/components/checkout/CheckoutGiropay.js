import React from 'react'

function CheckoutGiropay({ handleInputChange, giropayClicked, setFullName }) {
    return (
        <div className="borderTop">
            <input className="checkoutInputWallets" type="radio" id="giropay" name="checkoutOption" value="giropay" onChange={handleInputChange} />
            <label htmlFor="giropay">
                <img className="giropaySVG" src="/checkout_pics/giropay.svg" alt="Giropay" />
            </label>

            {giropayClicked &&
                <div className="checkoutSection">

                    <p>
                        In order for you to pay with Giropay, they need your full name, <br />
                        You will be forwarded to Giropay to complete the payment process.
                    </p>

                    <label htmlFor='fullName'>Your full name: </label>
                    <input placeholder='John Doe' type='text' onChange={(e) => setFullName(e.target.value)} name='fullName' />

                </div>
            }

        </div>
    )
}

export default CheckoutGiropay
