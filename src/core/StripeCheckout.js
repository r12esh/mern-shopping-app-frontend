import React, {useState, useEffect} from 'react';
import {isAuthenticated} from "../auth/helper";
import {cartEmpty, loadCart} from "./helper/cartHelper";
import {Link} from "react-router-dom";

const StripeCheckout = ({products, setReload = f => f, reload}) => {

  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: ""
  })

  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated()._id;

  const getFinalPrice = () => {
    let finalPrice = 0;
    products.map(product => {
      finalPrice += product.price;
    })
    return finalPrice;
  }

  const showStripeButton = () => {
    return isAuthenticated() ? (
      <button className="btn btn-success">Pay with stripe</button>
    ) : (
      <Link to="/signin">
        <button className="btn btn-warning">Sign in</button>
      </Link>
    )
  };
  

  return (
    <div>
      <h2 className="text-white">
        Stripe Checkout ₹{getFinalPrice()}
      </h2>
      {showStripeButton()}
    </div>
  );
};

export default StripeCheckout;