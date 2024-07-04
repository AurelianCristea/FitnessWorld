import React from "react";
import './WorkoutDescription.css';

const WorkoutDescription = (props) => {
    const { exercise } = props;

    return (
        <div className="workoutdescription">
            <div className="workoutdescription-navigator">
                <div className="workoutdescription-nav-box active">Description</div>
            </div>
            <div className="workoutdescription-content">
                {exercise.description}
            </div>
        </div>
    );
}

export default WorkoutDescription;
