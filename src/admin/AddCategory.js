import React, {useState} from "react";
import Base from "../core/Base";
import {isAuthenticated} from "../auth/helper";
import {Link} from "react-router-dom";
import {createCategory} from "./helper/adminapicall";


const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const {user, token} = isAuthenticated();

  const goBack = () => {
    return (
      <div className="mt-1">
        <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
          Admin Home
        </Link>
      </div>
    )
  }

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    //Backend request fired
    createCategory(user._id, token, {name})
      .then(data => {
          if (data.error) {
            setError(true);
          } else {
            setError("");
            setSuccess(true);
            setName("");
          }
        }
      )
  }

  const successMessage = () => {
    if (success) {
      return <h4 className="text-success">Category created succesfully</h4>
    }
  }
  const warningMessage = () => {
    if (error) {
      return <h4 className={"text-danger"}>Failed to create category</h4>
    }
  }


  const myCategoryForm = () => {
    return (
      <form>
        <div className="form-group">
          <p className="lead">Enter the category</p>
          <input
            type="text"
            className={"form-control"}
            autoFocus
            required
            placeholder={"For ex. Summer"}
            value={name}
            onChange={handleChange}
          />
          <button onClick={handleSubmit} className="btn btn-outline-info my-3">Ceate Category</button>
        </div>
      </form>
    );
  };

  return (
    <Base
      title={"Create a category here"}
      description={"Create a new category for new T-shirts"}
      className={"container bg-info p-4"}
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {warningMessage()}
          {myCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;
