import React from "react";
import './Exercise.css'
import { Link } from "react-router-dom";

const Exercise = (props) => {
    return (
        <div className="exercise">
          <Link to={`/exercise/${props.id}`}><img src={props.image} alt="" /></Link>
          <p>{props.name}</p>
        </div>
    )
}

export default Exercise