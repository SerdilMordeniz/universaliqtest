import React, {useState} from 'react'
import Sidebar from './Sidebar'
import iqTestAPI from '../apis/iqTestAPI'

function ContactForm() {
    const [status] = useState("Send Message");
    const handleSubmit = async (e) => { 
        e.preventDefault();
        const {name, email, message} = e.target.elements
        let details = {
            name: name.value,
            email: email.value,
            message: message.value,
          }
        const results = await iqTestAPI.post('/contact', {
            name: details.name,
            email: details.email,
            message: details.message
        })

        if(results.status === 200){
            alert('Email sent successfully!')
            name.value= ''
            email.value=''
            message.value=''
        } else {
            alert('Something went wrong')
        }
        console.log(results)
    }

    return (
        <div className="home1">
            <Sidebar />
            <div className="contactForm">
            <h1>Contact us</h1>
            <form onSubmit={handleSubmit}>
                <div>

                    <input type="text" id="name" placeholder="Name" required />
                </div>
                <div>

                    <input type="email" id="email" placeholder="Email" required />
                </div>
                <div>
                    <textarea id="message" placeholder="Message" required />
                </div>
                <button type="submit">{status}</button>
            </form>
            </div>
        </div>
    )
}

export default ContactForm
