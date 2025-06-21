import React, { useContext, useState, useEffect } from "react";
import {
  CardElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { toast } from "react-toastify";
import { ContextStore } from "../../context/Context_Store";
import "./Order_Products.css";
import {clearCartItems} from "../../service/Cart_Service";
import { useNavigate } from "react-router-dom";


const stripePromise = loadStripe("pk_test_51RP5VmIMRkgfgmsY72nnjo6uXqA0AbDh3b9DKQVToWkznyBXq8aCb68qrDbhVt6BTdW4fCo2yXMUiBlcUR2PG8AI00Qle2WGLH"); // Put your Stripe publishable key here

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "20px",
      color: "#472f17",
      letterSpacing: "8px",
      fontFamily: "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
      "::placeholder": {
        color: "#472f17",
      },
    },
    invalid: {
      color: "#472f17",
    },
  },
};

const CheckoutForm = ({ clientSecret, orderId, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [succeeded, setSucceeded] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setError(null);

    const cardElement = elements.getElement(CardElement);

    // Confirm Card Payment
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (payload.error) {
      setError(`Payment failed: ${payload.error.message}`);
      toast.error(`Payment failed: ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      toast.success("Payment successful!");
      onPaymentSuccess();
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <CardElement id="card-element" options={CARD_ELEMENT_OPTIONS} />
      {error && <div className="card-error" role="alert">{error}</div>}
      <button
        disabled={processing || succeeded}
        id="submit"
        className="btn mt-3 paynow"
      >
        {processing ? "Processing..." : "PAY NOW"}
      </button>
      {succeeded && (
        <p className="result-message" style={{ color: "#472f17", marginTop: "45px", fontSize: "20p", letterSpacing: "8px", wordSpacing:"8px" }}>
          Payment succeeded. Thank you for shopping!
        </p>
      )}
    </form>
  );
};

const Order_Products = () => {
  const { Products_List, Product_Quantity, token, setProduct_Quantity } = useContext(ContextStore);
  const navigate = useNavigate();
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    mail: "",
    phone_number: "",
    address: "",
    city: "",
    country: "",
    zip_code: "",
  });
  const [clientSecret, setClientSecret] = useState("");
  const [orderId, setOrderId] = useState(null);

  const Cart_Products = Products_List.filter(
    (product) => Product_Quantity[product.product_id] > 0
  );

  const total = Cart_Products.reduce(
    (acc, product) =>
      acc + product.product_price * Product_Quantity[product.product_id],
    0
  );

  const shipping_price = total === 0 ? 0.0 : 10;
  const grand_total = total + shipping_price;

  const onChange_Handler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmit_Handler = async (event) => {
    event.preventDefault();

    if (Cart_Products.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    const order_data = {
      userAddr: `${data.first_name} ${data.last_name}, ${data.address}, ${data.city}, ${data.country}, ${data.zip_code}`,
      userPhone: data.phone_number,
      mail: data.mail,
      ordered_items: Cart_Products.map((item) => ({
        product_ID: item.product_id,
        product_Quant: Product_Quantity[item.product_id],
        product_price: item.product_price * Product_Quantity[item.product_id],
        product_category: item.product_category,
        product_imageUrl: item.product_imageUrl,
        product_description: item.product_description,
        product_name: item.product_name,
      })),
      products_amount: grand_total.toFixed(2),
      Order_State: "Preparing",
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/orders/create",
        order_data,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201 && response.data.stripeOrderID && response.data.clientSecret) {
        setClientSecret(response.data.clientSecret);
        setOrderId(response.data.stripeOrderID);
      } else {
        toast.error("Order placement failed. Please try again later.");
      }
    } catch (error) {
      toast.error("Order placement failed. Please try again later.");
    }
  };

  const onPaymentSuccess = async () => {
    // Clear cart or navigate user to orders page, etc.
    // Example: navigate("/myorders");
    toast.success("Order confirmed and cart cleared!");
    await clearCart();
    navigate("/myorders");
  };





  const clearCart= async() => {
    try {
        await clearCartItems(token, setProduct_Quantity);
    } catch (error) {
        toast.error("Error while cart clearing.");
    }
  }

  return (
    <div className="container checkout">
      <main>
        <div className="py-5 text-center">
          {/* Your Logo */}
        </div>

        <div className="row g-5">
          <div className="col-md-6 col-lg-6 order-md-last">
            {/* Cart Summary (same as before) */}
            <h4 className="text-center mb-5 mt-0" style={{ color: "#472f17", letterSpacing:"8px", wordSpacing:"8px" }}>
              CART SUMMARY
            </h4>
            <ul className="list-group mb-3">
              {Cart_Products.map((product) => (
                <li
                  key={product.product_id}
                  className="list-group-item d-flex justify-content-between lh-sm"
                  style={{
                    color: "#472f17",
                    backgroundColor: "#D8C7BF",
                    borderRadius: "8px",
                    border: "none",
                    fontSize: "18px",
                  }}
                >
                  <div>
                    <h6 className="name-product mb-3 mt-2">{product.product_name}</h6>
                    <span className="quantity" style={{ fontSize: "17px" }}>
                      Quantity: {Product_Quantity[product.product_id]}
                    </span>
                  </div>
                  <span className="text-price mt-2">
                    {(product.product_price * Product_Quantity[product.product_id]).toFixed(2)} RON
                  </span>
                </li>
              ))}
              <li
                className="list-group-item d-flex justify-content-between"
                style={{
                  color: "#472f17",
                  backgroundColor: "#D8C7BF",
                  borderRadius: "8px",
                  border: "none",
                  fontSize: "18px",
                }}
              >
                <div>
                  <span>Shipping</span>
                </div>
                <span>{shipping_price.toFixed(2)} RON</span>
              </li>
              <li
                className="list-group-item d-flex justify-content-between"
                style={{
                  color: "#472f17",
                  backgroundColor: "#D8C7BF",
                  borderRadius: "8px",
                  border: "none",
                  fontSize: "21.5px",
                }}
              >
                <span>TOTAL</span>
                <span>{grand_total.toFixed(2)} RON</span>
              </li>
            </ul>
          </div>

          <div className="col-md-6 col-lg-6 mt-50">
            {!clientSecret ? (
              <>
                <h4 className="mb-5 text-center" style={{ color: "#472f17" , letterSpacing:"8px", wordSpacing:"8px"}}>
                  BILLING ADDRESS
                </h4>
                <form className="needs-validation" onSubmit={onSubmit_Handler}>
                  {/* Your address form inputs same as before */}
                  <div className="row g-3">
                    {/* First Name */}
                    <div className="col-sm-6">
                      <label htmlFor="firstName" className="form-label">
                        First name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        name="first_name"
                        required
                        onChange={onChange_Handler}
                        value={data.first_name}
                      />
                    </div>

                    {/* Last Name */}
                    <div className="col-sm-6">
                      <label htmlFor="lastName" className="form-label">
                        Last name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        name="last_name"
                        required
                        onChange={onChange_Handler}
                        value={data.last_name}
                      />
                    </div>

                    {/* Email */}
                    <div className="col-12">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="mail"
                        required
                        onChange={onChange_Handler}
                        value={data.mail}
                      />
                    </div>

                    {/* Phone */}
                    <div className="col-12">
                      <label htmlFor="phone" className="form-label">
                        Phone
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="phone"
                        name="phone_number"
                        required
                        onChange={onChange_Handler}
                        value={data.phone_number}
                      />
                    </div>

                    {/* Address */}
                    <div className="col-12">
                      <label htmlFor="address" className="form-label">
                        Address
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="address"
                        name="address"
                        required
                        onChange={onChange_Handler}
                        value={data.address}
                      />
                    </div>

                    {/* Country */}
                    <div className="col-md-5">
                      <label htmlFor="country" className="form-label">
                        Country
                      </label>
                      <select
                        className="form-select"
                        id="country"
                        name="country"
                        required
                        onChange={onChange_Handler}
                        value={data.country}
                      >
                        <option value="">Choose...</option>
                        <option>Romania</option>
                      </select>
                    </div>

                    {/* City */}
                    <div className="col-md-4">
                      <label htmlFor="state" className="form-label">
                        City
                      </label>
                      <select
                        className="form-select"
                        id="state"
                        name="city"
                        required
                        onChange={onChange_Handler}
                        value={data.city}
                      >
                        <option value="">Choose...</option>
                        <option>Timisoara</option>
                      </select>
                    </div>

                    {/* Zip */}
                    <div className="col-md-3">
                      <label htmlFor="zip" className="form-label">
                        Zip
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="zip"
                        name="zip_code"
                        required
                        onChange={onChange_Handler}
                        value={data.zip_code}
                      />
                    </div>
                  </div>

                  <button
                    className="w-100 btn btn-lg mb-5"
                    type="submit"
                    disabled={Cart_Products.length === 0}
                    style={{
                      marginTop: "50px",
                      marginBottom: "10px",
                      backgroundColor: "#D8C7BF",
                      color: "#472f17",
                      fontSize: "21.5px",
                      letterSpacing: "5px",
                      wordSpacing: "1.25px",
                      padding: "12px 24px",
                      border: "none",
                    }}
                  >
                    CONTINUE TO CHECKOUT
                  </button>
                </form>
              </>
            ) : (
              <>
                <h4
                  className="mb-5 text-center"
                  style={{ color: "#472f17", fontSize: "25px", letterSpacing:"8px", wordSpacing:"8px" }}
                >
                  ENTER CARD DETAILS
                </h4>
                <CheckoutForm
                  clientSecret={clientSecret}
                  orderId={orderId}
                  onPaymentSuccess={onPaymentSuccess}
                />
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default function WrappedOrderProducts() {
  return (
    <Elements stripe={stripePromise}>
      <Order_Products />
    </Elements>
  );
}
