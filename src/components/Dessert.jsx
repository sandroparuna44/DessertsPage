import clsx from "clsx";
import { AddToCart, DecrementQuantity, IncrementQuantity } from "../Icons";
import { useState } from "react";

const BASE_URL = "https://res.cloudinary.com/dc2c49xov/desserts";

export const Dessert = ({ dessert, setCartItems, cartItems }) => {
  const [quantity, setQuantity] = useState(0);
  const images = dessert.images;
  const cartItemNames = cartItems.map((dessertObj) => dessertObj.name);
  const currentlyInCart = cartItemNames.includes(dessert.name);

  const updateCart = (action) => {
    let newQuantity;

    if (action === "add") {
      newQuantity = 1;
    } else if (action === "increment") {
      newQuantity = quantity + 1;
    } else {
      newQuantity = quantity - 1;
    }

    setQuantity(newQuantity);

    if (newQuantity === 0) {
      setCartItems(
        cartItems.filter((dessertObj) => dessertObj.name !== dessert.name)
      );
    } else {
      if (currentlyInCart) {
        setCartItems(
          cartItems.map((dessertObj) => {
            if (dessertObj.name === dessert.name) {
              return { ...dessertObj, quantity: newQuantity };
            }
            return dessertObj;
          })
        );
      } else {
        setCartItems([
          ...cartItems,
          {
            ...dessert,
            quantity: newQuantity,
          },
        ]);
      }
    }
  };

  return (
    <div className={clsx("dessert", currentlyInCart && "added")}>
      <picture>
        <source
          media="(min-width:650px)"
          srcset={`${BASE_URL}/${images.tablet}`}
        />
        <source
          media="(min-width:465px)"
          srcset={`${BASE_URL}/${images.mobile}`}
        />
        <img src={`${BASE_URL}/${images.desktop}`} />
      </picture>
      {!currentlyInCart ? (
        <button className="cart-btn" onClick={() => updateCart("add")}>
          <AddToCart /> Add to cart
        </button>
      ) : (
        <div className="quantity-btns">
          <button onClick={() => updateCart("remove")}>
            <DecrementQuantity />
          </button>
          <span>{quantity}</span>
          <button
            onClick={() => {
              updateCart("increment");
            }}
          >
            <IncrementQuantity />
          </button>
        </div>
      )}

      <div className="details">
        <span className="category">{dessert.category}</span>
        <p className="title">{dessert.name}</p>
        <p className="price">${dessert.price}</p>
      </div>
    </div>
  );
};
