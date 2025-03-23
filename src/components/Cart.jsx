import { RemoveItem, CarbonNeutral, EmptyCart } from "../Icons";

export const Cart = ({ setCartItems, cartItems }) => {
  let totalPrice = 0;

  const removeCartItem = (dessert) => {
    setCartItems(
      cartItems.filter((dessertObj) => dessertObj.name !== dessert.name)
    );
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart">
        <h2>Your cart ({cartItems.length})</h2>
        <div className="empty">
          <EmptyCart />
          <p>Your added items will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart">
      <h2>Your cart ({cartItems.length})</h2>
      <ul>
        {cartItems.map((dessertObj) => {
          totalPrice += dessertObj.price * dessertObj.quantity;

          return (
            <li key={dessertObj.name}>
              <p className="title">{dessertObj.name}</p>
              <span className="quantity">{dessertObj.quantity}x</span>
              <span className="price">@${dessertObj.price.toFixed(2)}</span>
              <span className="total">
                ${(dessertObj.price * dessertObj.quantity).toFixed(2)}
              </span>
              <button
                className="remove-btn"
                onClick={() => removeCartItem(dessertObj)}
              >
                <RemoveItem />
              </button>
            </li>
          );
        })}
      </ul>
      <div className="summary">
        <div className="total">
          <p>Order total</p>
          <p className="price">${totalPrice.toFixed(2)}</p>
        </div>
        <p className="carbon-neutral">
          <CarbonNeutral />
          This is a <strong>carbon-neutral</strong> delivery
        </p>
        <button className="order-btn">Confirm Order</button>
      </div>
    </div>
  );
};
