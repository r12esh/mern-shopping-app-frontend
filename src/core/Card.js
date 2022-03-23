import React, {useState} from 'react';
import ImageHelper from "./helper/ImageHelper";
import {Redirect} from "react-router-dom";
import {addItemToCart, removeItemFromCart} from "./helper/cartHelper";

const Card = ({
                product,
                addToCart = true,
                removeFromCart = false,
                setReload = f => f,
                reload = undefined
              }) => {

    const [redirect, setRedirect] = useState(false);
    const cardTitle = product ? product.name : "A photo from Pexels";
    const cardDescrption = product ? product.description : "A default description";
    const cardPrice = product ? product.price : "3,499,999";

    const addToTheCart = () => {
      addItemToCart(product, () => setRedirect(true));
    }

    const getARedirect = (redirect) => {
      if (redirect) {
        return <Redirect to="/cart"/>
      }
    }

    const
      showAddToCart = (addToCart) => {
        return (addToCart && (
          <button
            onClick={addToTheCart}
            className="btn btn-block btn-outline-success mt-2 mb-2"
          >
            Add to Cart
          </button>
        ))
      }

    const showRemoveFromCart = (removefromCart) => {
      return (removefromCart && (
        <button
          onClick={() => {
            removeItemFromCart(product._id);
            setReload(!reload);
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      ))
    }

    return (
      <div className="card text-white bg-dark border border-info ">
        <div className="card-header lead">{cardTitle}</div>
        <div className="card-body">
          {getARedirect(redirect)}
          <ImageHelper product={product}/>
          <p className="lead bg-success font-weight-normal text-wrap">
            {cardDescrption}
          </p>
          <p className="btn btn-success rounded  btn-sm px-4">₹ {cardPrice}</p>
          <div className="row">
            <div className="col-12">{showAddToCart(addToCart)}</div>
            <div className="col-12">{showRemoveFromCart(removeFromCart)}</div>
          </div>
        </div>
      </div>
    )
      ;
  }
;

export default Card;