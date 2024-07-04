import React from 'react'
import { useEffect } from 'react'
import location_icon from '../Components/Assets/location_icon.png'
import phone_icon from '../Components/Assets/phone_icon.png'
import email_icon from '../Components/Assets/email_icon.png'
import './CSS/Contact.css'

const Contact = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className='contact'>
            <div className='contact-title'>
                <h1>Contact Us</h1>
            </div>
            <hr />
            <div className='contact-info'>
                <div className='info-section'>
                    <img src={location_icon} alt='Location Icon' className='icon' />
                    <div>
                        <h2>Our Address</h2>
                        <p>Bulevardul Eroilor nr 12, Bucuresti, Romania</p>
                    </div>
                </div>
                <div className='info-section'>
                    <img src={phone_icon} alt='Phone Icon' className='icon' />
                    <div>
                        <h2>Phone Number</h2>
                        <p>+40 763 193 991</p>
                    </div>
                </div>
                <div className='info-section'>
                    <img src={email_icon} alt='Email Icon' className='icon' />
                    <div>
                        <h2>Email</h2>
                        <p>fitnessworld_support@gmail.com</p>
                    </div>
                </div>
                <div className='map-section'>
                    <iframe
                        title="Google Maps"
                        width="100%"
                        height="300"
                        loading="lazy"
                        allowFullScreen
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2848.324642511354!2d26.116638915848266!3d44.43651627910184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1ffb33c37c145%3A0xef345b0e19a388cf!2sStrada%20Eroilor%2012%2C%20Bucure%C8%99ti%20030008!5e0!3m2!1sen!2sro!4v1649348784127!5m2!1sen!2sro"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default Contact;