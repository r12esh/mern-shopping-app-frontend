import React, {useEffect, useState} from "react";
import Base from "./Base";
import Card from "./Card";
import {loadCart} from "./helper/cartHelper";


const Cart = () => {

  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  const loadAllProducts = () => {
    return (
      <div>
        <h1>
          This section is to load products
          {
            products.map((product, index) => {
              return (
                <Card
                  key={index}
                  product={product}
                  removeFromCart={true}
                  addToCart={false}
                  setReload={setReload}
                  reload={reload}
                />
              )
            })
          }
        </h1>
      </div>
    )
  }

  const loadCheckout = () => {
    return (
      <div>
        <h1>
          This section is for checkout
        </h1>
      </div>
    )
  }

  useEffect(() => {
    setProducts(loadCart())
  }, [reload])

  return (
    <Base title="Cart page" description="Ready to checkout">
      <div className="row text-center">
        <div className="col-6">{loadAllProducts()}</div>
        <div className="col-6">{loadCheckout()}</div>
      </div>
    </Base>
  );
};

export default Cart;