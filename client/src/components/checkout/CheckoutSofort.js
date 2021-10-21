import React from 'react'

function CheckoutSofort({ handleInputChange, sofortClicked, handleSofortCountryChange }) {
    return (
        <div className="borderTop">
            <input className="checkoutInputWallets" type="radio" id="sofort" name="checkoutOption" value="sofort" onChange={handleInputChange} />
            <label htmlFor="sofort">
                <img className="sofortSVG" src="/checkout_pics/sofort.svg" alt="Sofort Pay" />
            </label>
            {sofortClicked &&
                <div className="checkoutSection">

                    <p>In order for you to pay with sofort payment, they need your bank's location. <br/>
                    You will be forwarded to a Sofort to complete the payment process.
                    </p>
                    
                    <label htmlFor="countriesForSofort">Select the location of your bank: </label>
                    <select name="countriesForSofort" id="countriesForSofort" onChange={(e) => handleSofortCountryChange(e)}>
                        <option value="" hidden ></option>
                        <option value="AT">Austria</option>
                        <option value="BE">Belgium</option>
                        <option value="DE">Germany</option>
                        <option value="IT">Italy</option>
                        <option value="NL">Netherlands</option>
                        <option value="ES">Spain</option>
                    </select>

                </div>
            }
        </div>
    )
}

export default CheckoutSofort
