import React, {useState} from "react";
import Base from "../core/Base";
import {Link, Redirect} from "react-router-dom";
import {signin, authenticate, isAuthenticated} from "../auth/helper";


const Signin = () => {

  const [values, setValues] = useState({
    email: "a@ritesh.com",
    password: "123456",
    error: "",
    loading: false,
    didRedirect: false
  });

  const {email, password, error, loading, didRedirect} = values;

  const {user} = isAuthenticated();

  const handleChange = name => event => {
    setValues({...values, error: false, [name]: event.target.value})
  }

  const handleSubmit = event => {
    event.preventDefault();
    setValues({...values, error: false, loading: true});
    signin({email, password})
      .then(data => {
        console.log("SIGN IN KE BAD KA data:", data)
        if (data.error) {
          setValues({...values, error: data.error, loading: false});
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true
            })
          })
        }
      })
      .catch(err => console.log("Error hai Signin me: ", err))
  }

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to={"/admin/dashboard"}/>
      } else {
        return <Redirect to={"/user/dashboard"}/>
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/"/>
    }
  }

  const loadingMessage = () => {
    return (
      loading && (
        <div className="row">
          <div className="col-md-6 offset-sm-3 text-left">
            <div className="alert alert-info">
              Loading...
            </div>
          </div>
        </div>
      )
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

  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group my-2">
              <label className="text-light">Email</label>
              <input
                onChange={handleChange("email")}
                value={email}
                name="mern-email"
                className="form-control"
                type="email"
              />
            </div>
            <div className="form-group my-2">
              <label className="text-light">Password</label>
              <input
                onChange={handleChange("password")}
                value={password}
                name="mern-password"
                className="form-control"
                type="password"
              />
            </div>
            <button
              onClick={handleSubmit} className="btn btn-success btn-block form-control my-3">Submit
            </button>
          </form>
        </div>
      </div>
    )
  }


  return (
    <Base title={"Sign in page"} description={"A page for user to sign in!"}>
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signin;