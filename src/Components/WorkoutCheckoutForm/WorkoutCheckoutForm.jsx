import React, { useState } from 'react';
import './WorkoutCheckoutForm.css';

const WorkoutCheckoutForm = ({ onSubmit, onClose }) => {
    const [formData, setFormData] = useState({
        day: '',
        sets: '',
        reps: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="checkout-form-overlay">
            <div className="checkout-form-container">
                <button className="close-button" onClick={onClose}>X</button>
                <h2>Workout Checkout Form</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Day:</label>
                        <input type="text" name="day" value={formData.day} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Sets:</label>
                        <input type="number" name="sets" value={formData.sets} onChange={handleChange} required />
                    </div>
                    <div>
                        <label>Reps:</label>
                        <input type="number" name="reps" value={formData.reps} onChange={handleChange} required />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default WorkoutCheckoutForm;
