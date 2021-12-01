import React, { useEffect, useState } from "react";
import axios from "axios";

import Exercise from "./exercise.component";

const ExercisesList = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/exercises/")
      .then((res) => {
        res.data.forEach((element) => {
          setExercises((prevState) => [...prevState, element]);
        });
      })
      .catch((err) => console.log("Error: " + err));
  }, []);

  const deleteExercise = (id) => {
    axios
      .delete("http://localhost:5000/exercises/" + id)
      .then((res) => console.log(res.data));

    setExercises(() => {
      exercises.filter((exercise) => exercise._id !== id);
    });
  };

  return (
    <div>
      <h3>Exercises List</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <td>Username</td>
            <td>Description</td>
            <td>Duration</td>
            <td>Date</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {exercises.map((exercise) => {
            return (
              <Exercise
                exercise={exercise}
                deleteExercise={deleteExercise}
                key={exercise._id}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ExercisesList;
