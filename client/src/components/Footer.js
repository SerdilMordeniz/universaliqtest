import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer>
            <Link to="/contact">Contact</Link>  | 
            <Link to="/privacy-policy">Privacy Policy</Link>  | 
            <Link to="/terms-of-service">Terms of Service</Link>
            <div className="copyright">
                Made with️ ❤️ in Switzerland © 2021 Universaliqtest. All rights reserved.
            </div>
        </footer>
    )
}

export default Footer
