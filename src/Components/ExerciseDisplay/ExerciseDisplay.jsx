import React from 'react';
import './ExerciseDisplay.css';
import { ShopContext } from "../../Context/ShopContext";
import { useContext } from "react";

const ExerciseDisplay = (props) => {
  
  const { exercise } = props;
  const {addToWorkout}=useContext(ShopContext);


  return (
    <div className="exercisedisplay">
      <div className="exercisedisplay-left">
        <div className="exercisedisplay-video">
          <video width="800" height="500" controls>
            <source src={exercise.video} type="video/mp4" />
          </video>
        </div>
      </div>
      <div className="exercisedisplay-right">
        <h1>{exercise.name}</h1>
        <img src={exercise.image} alt={exercise.name} className="exercisedisplay-image" />
        <div className="exercisedisplay-category">
          <h3>Target muscle: {exercise.category}</h3>
        </div>
        <button onClick={() => addToWorkout(exercise.id)}>Add to Workout</button>
      </div>
    </div>
  );
};

export default ExerciseDisplay;
