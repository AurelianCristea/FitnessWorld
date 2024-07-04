import React from "react";
import './Banner.css'
import banner_image from '../Assets/banner_image.png'
import whey_icon from '../Assets/whey_icon.png'

const Banner = () => {
    return (
        <div className="banner">
            <div className="banner-left">
            <h2>FitnessWorld</h2>
                <div className="banner-whey-icon">
                    <p>Get the best</p>
                    <img src={whey_icon} alt="" />
                </div>
                <p>find the best supplements</p>
                <p>for your fitness goals</p>
            </div>
            <div className="banner-right">
                <img src={banner_image} alt="" />
            </div>
        </div>
    )
}

export default Banner