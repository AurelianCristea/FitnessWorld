import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './CSS/LoginSignup.css';
import { UserContext } from '../Context/UserContext';

const LoginSignup = () => {
    const { setUser, setId } = useContext(UserContext);
    const [state, setState] = useState("Login");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    const handleSubmit = async () => {
        if (!agreeToTerms) {
            setError("You must agree to the terms of use & privacy policy.");
            return;
        }
        
        setError(""); 
        setMessage(""); 

        if (state === "Sign Up" && password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        const baseUrl = "https://localhost:7286";
        const url = state === "Sign Up" ? `${baseUrl}/User/register` : `${baseUrl}/User/login`;
        const payload = { name, password };

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const responseData = await response.text();

            if (response.ok) {
                setMessage(responseData);

                const userIdResponse = await fetch(`${baseUrl}/User/getUserIdByName?name=${name}`);
                const userIdData = await userIdResponse.json();
                
                if (userIdResponse.ok) {
                    setUser(name);
                    setId(userIdData.id);

                    if (name === "admin" && password === "admin") {
                        navigate('/admin');
                    } else {
                        navigate('/');
                    }
                } else {
                    setError("Failed to fetch user ID");
                }
            } else {
                setError(responseData || "An error occurred. Please try again.");
            }
        } catch (error) {
            setError("An error occurred. Please try again.");
            console.error("Request error:", error);
        }
    };

    return (
        <div className='loginsignup'>
            <div className='loginsignup-container'>
                <h1>{state}</h1>
                <div className='loginsignup-fields'>
                    <input 
                        type='text' 
                        placeholder='Username' 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                    />
                    <input 
                        type='password' 
                        placeholder='Password' 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    {state === "Sign Up" && 
                        <input 
                            type='password' 
                            placeholder='Confirm Password' 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                        />
                    }
                </div>
                {error && <p className='loginsignup-error'>{error}</p>}
                {message && <p className='loginsignup-message'>{message}</p>}
                <button onClick={handleSubmit}>Continue</button>
                {state === "Sign Up"
                    ? <p className='loginsignup-login'>Already have an account? <span onClick={() => setState("Login")}>Login here</span></p>
                    : <p className='loginsignup-login'>Create an account? <span onClick={() => setState("Sign Up")}>Click here</span></p>
                }
                <div className="loginsignup-agree">
                    <input 
                        type='checkbox' 
                        checked={agreeToTerms} 
                        onChange={(e) => setAgreeToTerms(e.target.checked)} 
                    />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>
            </div>
        </div>
    );
};

export default LoginSignup;
