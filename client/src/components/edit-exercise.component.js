import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const EditExercise = () => {
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);

  let params = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:5000/exercises/" + params.id)
      .then((res) => {
        setUsername(res.data.username);
        setDescription(res.data.description);
        setDuration(res.data.duration);
        setDate(new Date(res.data.date));
      })
      .catch((err) => console.log("Error: " + err));

    axios.get("http://localhost:5000/users").then((res) => {
      if (res.data.length > 0) {
        res.data.map((user) =>
          setUsers((prevState) => [...prevState, user.username])
        );
      }
    });
  }, [params]);

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const onChangeDuration = (e) => {
    setDuration(e.target.value);
  };

  const onChangeDate = (date) => {
    setDate(date);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const exercise = {
      username: username,
      description: description,
      duration: duration,
      date: date,
    };

    console.log(exercise);

    axios
      .post("http://localhost:5000/exercises/update/" + params.id, exercise)
      .then((res) => console.log(res.data))
      .catch((err) => console.log("Error: " + err));

    window.location = "/";
  };

  return (
    <div>
      <h3 className="text-center">Edit Exercise Log</h3>
      <form className="col-lg-5 mx-auto p-3 bg-warning" onSubmit={onSubmit}>
        <div className="form-group mx-auto col-lg-11">
          <label htmlFor="username">Username: </label>
          <select
            name="username"
            className="form-control"
            value={username}
            onChange={onChangeUsername}
            required
          >
            {users.map((user) => {
              return (
                <option key={user} value={user}>
                  {user}
                </option>
              );
            })}
          </select>
        </div>
        <br />
        <div className="form-group mx-auto col-lg-11">
          <label htmlFor="description">Description: </label>
          <input
            name="description"
            className="form-control"
            value={description}
            onChange={onChangeDescription}
            type="text"
            required
          />
        </div>
        <br />
        <div className="form-group mx-auto col-lg-11">
          <label htmlFor="duration">Duration (in minutes): </label>
          <input
            name="duration"
            className="form-control"
            value={duration}
            onChange={onChangeDuration}
            type="text"
            required
          />
        </div>
        <br />
        <div className="form-group mx-auto col-lg-11">
          <label htmlFor="date">Date: </label>
          <DatePicker
            className="container-fluid text-center"
            selected={date}
            onChange={onChangeDate}
          />
        </div>
        <br />
        <div className="form-group text-center">
          <button type="submit" className="btn btn-primary">
            Edit Exercise Log
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditExercise;
