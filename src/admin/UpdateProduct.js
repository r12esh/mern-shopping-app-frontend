import React, {useEffect, useState} from 'react';
import Base from "../core/Base";
import {Link} from "react-router-dom";
import {updateAProduct, getAProduct, getAllCategories} from "./helper/adminapicall";
import {isAuthenticated} from "../auth/helper";

const UpdateProduct = ({match}) => {

  const productId = match.params.productId;

  const {user, token} = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    category: "",
    allCategories: [],
    loading: "",
    error: "",
    createdProduct: "",
    getRedirect: "",
    formData: ""
  })

  const {
    name,
    description,
    price,
    stock,
    photo,
    category,
    allCategories,
    loading,
    error,
    createdProduct,
    getRedirect,
    formData
  } = values;

  const preloadAllCatgories = () => {
    getAllCategories().then(data => {
      // console.log("Hi hello", data)
      if (data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({allCategories: [...data], formData: new FormData()});
        // console.log("Categories hai ye", allCategories)
      }
    })
  }

  const preLoadProductData = (productId) => {
    getAProduct(productId).then(data => {
      if (data.error) {
        setValues({...values, error: data.error})
      } else {
        //Clever shit:- First Load categories, Then Load the other data without ...values
        preloadAllCatgories();
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category,
          stock: data.stock,
          formData: new FormData()
        })
      }
    });
  }


  const handleChange = name => event => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({...values, [name]: value});
  }


  const handleSubmit = event => {
    event.preventDefault();
    setValues({...values, error: "", loading: true});
    updateAProduct(productId, user._id, token, formData).then(data => {
      if (data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          price: "",
          photo: "",
          stock: "",
          loading: false,
          createdProduct: data.name
        })
      }
    }).catch(err => console.log(err))
  }

  const successMessage = () => {
    return (
      <div
        className="alert fw-bold alert-success mt-3 fs-5"
        style={{display: createdProduct ? "" : "none"}}
      >
        {createdProduct} updated succesfully
      </div>
    )
  }

  //USEEFFECT HOOK:-
  useEffect(() => {
    preLoadProductData(productId);
  }, []);

  const createProductForm = () => (
    <form>
      <span>Post photo</span>
      <div className="form-group my-2">
        <label className="form-control btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group my-2">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group my-2">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group my-2">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group my-2">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          {
            allCategories &&
            allCategories.map((category, index) => (
              <option key={index} value={category._id}>{category.name}</option>
            ))
          }
        </select>
      </div>
      <div className="form-group my-2">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={handleSubmit}
        className="btn btn-outline-success my-1"
      >
        Update Product
      </button>
    </form>
  );


  return (
    <Base
      title={`Update a product`}
      description="Update a product here"
      className="container bg-info p-3 my-2"
    >
      <Link to="/admin/dashboard" className="btn btn-dark btn-md mb-3"> Admin Home</Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {createProductForm()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateProduct;