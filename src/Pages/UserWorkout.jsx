import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../Context/UserContext';
import './CSS/UserWorkout.css';

const UserWorkout = () => {
    const [workouts, setWorkouts] = useState([]);
    const { user, id } = useContext(UserContext);

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                if (user && id) {
                    const response = await axios.get(`https://localhost:7286/Workout/getWorkouts`, {
                        params: { userId: id }
                    });
                    setWorkouts(response.data);
                }
            } catch (error) {
                console.error('Error fetching workouts:', error);
            }
        };

        fetchWorkouts();
    }, [user, id]);

    if (!user) {
        return <div>Please log in to view your workouts.</div>;
    }

    return (
        <div className="user-workouts">
            <h1>Your Workouts</h1>
            {workouts.length === 0 ? (
                <p>No workouts found.</p>
            ) : (
                workouts.map(workout => (
                    <div key={workout.id} className="workout">
                        <h2>Workout ID: {workout.id}</h2>
                        <p>Day: {workout.day}</p>
                        <p>Sets: {workout.sets}</p>
                        <p>Reps: {workout.reps}</p>
                        <h3>Exercises:</h3>
                        {workout.items && workout.items.length > 0 && (
                            <ul>
                                {workout.items.map(item => (
                                    <li key={item.workoutId}>
                                        {item.exerciseName} - {item.sets} sets x {item.reps} reps
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default UserWorkout;
