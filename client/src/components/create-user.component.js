import React, { useState } from "react";
import axios from "axios";

const CreateUser = () => {
  const [username, setUsername] = useState("");

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const user = {
      username: username,
    };

    console.log(user);

    axios
      .post("http://localhost:5000/users/add", user)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    setUsername("");
  };

  return (
    <div>
      <h3 className="text-center">Create New User</h3>
      <form className="col-lg-5 mx-auto p-3 bg-info" onSubmit={onSubmit}>
        <div className="form-group mx-auto col-lg-11">
          <label htmlFor="username">Username: </label>
          <input
            name="username"
            className="form-control"
            value={username}
            onChange={onChangeUsername}
            type="text"
            required
          />
        </div>
        <br />
        <div className="form-group text-center">
          <button type="submit" className="btn btn-primary">
            Create User
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
