import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cartEmpty, loadCart } from "./helper/cartHelper";
import { getMeToken, processPayment } from "./helper/paymentBHelper";
import { createOrder } from "./helper/orderHelper";
import { isAuthenticated } from "../auth/helper";
import DropIn from "braintree-web-drop-in-react";

const PaymentB = ({ products, setReload, reload }) => {
  const userId = isAuthenticated()?.user?._id;
  const token = isAuthenticated()?.token;
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });

  const getAmount = () => {
    let amount = 0;
    for (let product of products) {
      amount += product.price;
    }
    return amount;
  };

  const getToken = (userId, token) => {
    getMeToken(userId, token).then((Information) => {
      // console.log("Information", info);
      if (Information.error) {
        setInfo({ ...info, error: Information.error });
      } else {
        const clientToken = Information.clientToken;
        setInfo({ ...info, clientToken });
      }
    });
  };

  const onPurchase = () => {
    setInfo({ ...info, loading: true });
    let nonce;
    let getNonce = info.instance.requestPaymentMethod().then((data) => {
      nonce = data.nonce;
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getAmount(),
      };
      processPayment(userId, token, paymentData)
        .then((response) => {
          setInfo({ ...info, success: response.success, loading: false });
          const orderData = {
            products,
            transaction_id: response.transaction.id,
            amount: parseFloat(response.transaction.amount),
          };
          createOrder(userId, token, orderData);
          console.log("ORDE RDATA", orderData);
          cartEmpty();
          setReload(!reload);
        })
        .catch((error) => {
          setInfo({ ...info, loading: false, success: false });
        });
    });
  };

  //Components start from here

  const showBtDropIn = () => {
    return (
      <div>
        {info?.clientToken !== null && products?.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info?.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <div className="d-grid gap-1">
              <button
                type="button"
                className="btn btn-success"
                onClick={onPurchase}
              >
                Buy
              </button>
            </div>
          </div>
        ) : (
          <h3>Please log in or add something to cart</h3>
        )}
      </div>
    );
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  // console.log("INFO OBJECT hai sala", info);
  return (
    <div>
      <h3>{products.length > 0 && `Your bill is ${getAmount()}`}</h3>
      {showBtDropIn()}
    </div>
  );
};

export default PaymentB;
