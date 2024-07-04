import React from 'react';
import './Footer.css';
import logo from '../Assets/logo.png';
import facebook_icon from '../Assets/facebook_icon.png';
import instagram_icon from '../Assets/instagram_icon.png';
import tiktok_icon from '../Assets/tiktok_icon.png';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className='footer'>
            <div className="footer-logo">
                <p>FitnessWorld</p>
                <img src={logo} alt='FitnessWorld Logo' />
            </div>
            <ul className="footer-links">
                <li><Link to="/">Acasa</Link></li>
                <li><Link to="/suplimente">Suplimente</Link></li>
                <li><Link to="/workout">Exercitii</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>
            <div className="footer-social-icon">
                <div className="footer-icons-container">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <img src={facebook_icon} alt='Facebook' />
                    </a>
                </div>
                <div className="footer-icons-container">
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                        <img src={instagram_icon} alt='Instagram' />
                    </a>
                </div>
                <div className="footer-icons-container">
                    <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
                        <img src={tiktok_icon} alt='TikTok' />
                    </a>
                </div>
            </div>
            <div className="footer-copyright">
                <hr />
                <p>Copyright @2024 - All Right Reserved</p>
            </div>
        </div>
    );
}

export default Footer;
