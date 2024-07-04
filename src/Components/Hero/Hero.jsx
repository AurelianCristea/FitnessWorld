import React from "react";
import './Hero.css'
import flexed_arm_icon from '../Assets/flexed_arm_icon.png'   
import arrow_icon from '../Assets/arrow_icon.png'
import hero_image from '../Assets/hero_image.png'
import { Link } from "react-router-dom";

const Hero = () => {
    return (
        <div className="hero">
            <div className="hero-left">
            <h2>Get Fit</h2>
                <div className="hero-arm-icon">
                    <p>Get the best</p>
                    <img src={flexed_arm_icon} alt="" />
                </div>
                <p>supplements and workouts</p>
                <p>to get fit and healthy</p>
                <div className="hero-shop-btn">
                    <Link to="/suplimente">
                        <div>Shop now</div>
                        <img src={arrow_icon} alt="" />
                    </Link>
                </div>
            </div>
            <div className="hero-right">
                <img src={hero_image} alt="" />
            </div>
        </div>
    )
}

export default Hero