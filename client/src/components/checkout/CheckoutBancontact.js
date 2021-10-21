import React from 'react'

function CheckoutBancontact({ handleInputChange, bancontactClicked, setFullName }) {
    return (
        <div className="borderTop">
            <input className="checkoutInputWallets" type="radio" id="bancontact" name="checkoutOption" value="bancontact" onChange={handleInputChange} />
            <label htmlFor="bancontact">
                <img className="bancontactSVG" src="/checkout_pics/bancontact.svg" alt="Bancontact Pay" />
            </label>
            {bancontactClicked &&
                <div className="checkoutSection">

                    <p>
                        In order for you to pay with bancontact, they need your full name. <br/>
                        You will be forwarded to a Bancontact to complete the payment process.
                    </p>

                    <label htmlFor='fullName'>Your full name: </label> 
                    <input placeholder='John Doe' type='text' onChange={(e) => setFullName(e.target.value)} name='fullName' />

                </div>
            }
        </div>
    )
}

export default CheckoutBancontact
