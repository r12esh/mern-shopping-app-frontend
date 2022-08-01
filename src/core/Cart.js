import React, { useEffect, useState } from "react";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  const loadAllProducts = () => {
    return (
      <div>
        <h2>
          This section is to load products
          {products.map((product, index) => {
            return (
              <Card
                key={index}
                product={product}
                removeFromCart={true}
                addToCart={false}
                setReload={setReload}
                reload={reload}
              />
            );
          })}
        </h2>
      </div>
    );
  };

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  return (
    <Base title="Cart page" description="Ready to checkout">
      <div className="row text-center">
        <div className="col-6">
          {products?.length ? loadAllProducts() : <h3>No products in cart</h3>}
        </div>
        <div className="col-6">Payment section</div>
      </div>
    </Base>
  );
};

export default Cart;
