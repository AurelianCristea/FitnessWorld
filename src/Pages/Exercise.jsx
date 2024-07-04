import React from "react";
import ExerciseDisplay from "../Components/ExerciseDisplay/ExerciseDisplay";
import WorkoutDescription from "../Components/WorkoutDescription/WorkoutDescription";
import { ShopContext } from "../Context/ShopContext";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const Exercise = () => {
    
    const {all_workout} = useContext(ShopContext);
    const {exerciseId} = useParams();
    const exercise = all_workout.find((e) => e.id === Number(exerciseId));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    return (
        <div>
            <ExerciseDisplay exercise={exercise}/>
            <WorkoutDescription exercise={exercise}/>
        </div>
    );
}

export default Exercise;