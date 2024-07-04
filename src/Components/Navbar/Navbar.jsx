// src/Components/Navbar/Navbar.js
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import workout_icon from '../Assets/workout_icon.png';
import { ShopContext } from "../../Context/ShopContext";
import { UserContext } from "../../Context/UserContext";

const Navbar = () => {
    const [menu, setMenu] = useState("acasa");
    const { getTotalCartItems, getTotalWorkoutItems } = useContext(ShopContext);
    const [showDropdown, setShowDropdown] = useState(false);
    const { user, setUser,setId } = useContext(UserContext);

    const handleLogout = () => {
        setUser(null);
        setId(null);
        setShowDropdown(false);
    };

    return (
        <div className='navbar'>
            <div className="nav-logo">
                <p>FitnessWorld</p>
                <img src={logo} alt="" />
            </div>
            <ul className="nav-menu">
                <li onClick={() => { setMenu("acasa") }}>
                    <Link style={{ textDecoration: 'none' }} to='/'>Acasa</Link>
                    {menu === "acasa" ? <hr /> : <></>}
                </li>
                <li onClick={() => { setMenu("suplimente") }}>
                    <Link style={{ textDecoration: 'none' }} to='/suplimente'>Suplimente</Link>
                    {menu === "suplimente" ? <hr /> : <></>}
                </li>
                <li onClick={() => { setMenu("workout") }}>
                    <Link style={{ textDecoration: 'none' }} to='/workout'>BuildMyWorkout</Link>
                    {menu === "workout" ? <hr /> : <></>}
                </li>
                <li onClick={() => { setMenu("contact") }}>
                    <Link style={{ textDecoration: 'none' }} to='/contact'>Contact</Link>
                    {menu === "contact" ? <hr /> : <></>}
                </li>
            </ul>
            <div className="nav-login-cart">
                {user ? (
                    <div className="user-dropdown">
                        <button onClick={() => setShowDropdown(!showDropdown)}>{user}</button>
                        {showDropdown && (
                            <div className="dropdown-content">
                                <Link to='/orders'><button>Your Orders</button></Link>
                                <Link to='/workouts'><button>Your Workouts</button></Link>
                                <button onClick={handleLogout}>Logout</button>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link to='/login'><button>Login</button></Link>
                )}
                <Link to='/cart'>
                    <img src={cart_icon} alt="Cart Icon" className="cart-icon" />
                </Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
                <Link to='/workoutitems'>
                    <img src={workout_icon} alt="Workout Icon" className="workout-icon" />
                </Link>
                <div className="nav-workout-count">{getTotalWorkoutItems()}</div>
            </div>
        </div>
    );
}

export default Navbar;
