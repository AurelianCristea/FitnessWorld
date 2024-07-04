import React, { useContext, useState } from "react";
import './WorkoutItems.css';
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from '../Assets/remove_icon.png';
import WorkoutCheckoutForm from "../WorkoutCheckoutForm/WorkoutCheckoutForm";
import axios from 'axios';
import { UserContext } from '../../Context/UserContext';

const WorkoutItems = () => {
    const { all_workout, workoutItems, removeFromWorkout, clearWorkouts } = useContext(ShopContext);
    const { id } = useContext(UserContext);
    const [showCheckoutForm, setShowCheckoutForm] = useState(false);
    const [workoutPlaced, setWorkoutPlaced] = useState(false);

    

    const handleSaveWorkout = () => {
        setShowCheckoutForm(true);
    };

    const handleCheckoutSubmit = async (formData) => {
        const workoutDetails = {
            userId: id,
            day: formData.day,
            sets: formData.sets,
            reps: formData.reps,
            items: Object.keys(workoutItems)
                .filter(key => workoutItems[key] > 0)
                .map(key => {
                    const workout = all_workout.find(w => w.id === parseInt(key));
                    return {
                        exerciseId: key,
                        exerciseName: workout.name   
                    };
                }),
        };
    
        console.log('Workout Details:', workoutDetails);
    
        if (!workoutDetails.userId) {
            console.error('User Id is missing');
            return;
        }
    
        try {
            const response = await axios.post('https://localhost:7286/Workout/createWorkout', workoutDetails, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Workout response:', response.data);
            clearWorkouts();
            setWorkoutPlaced(true);
            setShowCheckoutForm(false);
            window.scrollTo(0, 0);
        } catch (error) {
            console.error('Error saving workout:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="workoutitems">
            {showCheckoutForm && (
                <WorkoutCheckoutForm onSubmit={handleCheckoutSubmit} onClose={() => setShowCheckoutForm(false)} />
            )}
            {workoutPlaced && (
                <div className="order-confirmation">
                    <h2>Your workout has been saved successfully!</h2>
                </div>
            )}
            <div className="workoutitems-format-main">
                <p>Workouts</p>
                <p>Title</p>
                <p>Category</p>
                <p>Remove</p>
            </div>
            <hr />
            {all_workout.map((workout) => {
                if (workoutItems[workout.id] > 0) {
                    return (
                        <div key={workout.id}>
                            <div className="workoutitems-format workoutitems-format-main">
                                <img src={workout.image} alt="" className="workouticon-workout-icon" />
                                <p>{workout.name}</p>
                                <p>{workout.category}</p>
                                <img
                                    className="workoutitems-remove-icon"
                                    src={remove_icon}
                                    onClick={() => { removeFromWorkout(workout.id) }}
                                    alt=""
                                />
                            </div>
                            <hr />
                        </div>
                    );
                }
                return null;
            })}
            <div className="workoutitems-down">                                   
                    <button onClick={handleSaveWorkout}>Save Workout</button>             
            </div>
        </div>
    );
}

export default WorkoutItems;
