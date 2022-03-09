import React, {useState} from "react";
import Base from "../core/Base";
import {Link} from "react-router-dom";
import {signup} from "../auth/helper";

const Signup = () => {

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false
  });

  const {name, email, password, error, success} = values;

  const handleChange = name => event => {
    setValues({...values, error: false, [name]: event.target.value})
  }

  const handleSubmit = event => {
    event.preventDefault();
    setValues({...values, error: false});
    signup({name, email, password})
      .then(data => {
        console.log("SIGN UP KE BAD KA data:", data)
        if (data.error) {
          setValues({...values, error: data.error, success: false})
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true
          })
        }
      })
      .catch(err => console.log("Error hai Signup me: ", err));
  }

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{display: success ? '' : 'none'}}
          >
            New account was created succesfully. <Link to="/signin">Login here</Link>
          </div>
        </div>
      </div>
    )
  }

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{display: error ? '' : 'none'}}
          >
            {error}
          </div>
        </div>
      </div>

    )
  }

  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group my-2">
              <label className="text-light">Name</label>
              <input
                value={name}
                name="mern-name"
                className="form-control"
                type="text"
                onChange={handleChange("name")}
              />
            </div>
            <div className="form-group my-2">
              <label className="text-light">Email</label>
              <input
                value={email}
                name="mern-email"
                className="form-control"
                type="email"
                onChange={handleChange("email")}
              />
            </div>
            <div className="form-group my-2">
              <label className="text-light">Password</label>
              <input
                value={password}
                name="mern-password"
                className="form-control"
                type="password"
                onChange={handleChange("password")}
              />
            </div>
            <button onClick={handleSubmit} className="btn btn-success btn-block form-control my-3">Submit</button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <Base title={"Sign up page"} description={"A page for user to sign up!"}>
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signup;