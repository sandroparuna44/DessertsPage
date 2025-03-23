import "./App.css";
import desserts from "./data.json";
import { Dessert } from "./components/Dessert";
import { useState } from "react";
import { Cart } from "./components/Cart";

function App() {
  const [cartItems, setCartItems] = useState([]);

  return (
    <div className="container">
      <main>
        <div className="desserts-col">
          <h1>Desserts</h1>
          <div className="desserts-container">
            {desserts.map((dessertObj) => {
              return (
                <Dessert
                  cartItems={cartItems}
                  setCartItems={setCartItems}
                  dessert={dessertObj}
                  key={dessertObj.name}
                />
              );
            })}
          </div>
        </div>
        <Cart setCartItems={setCartItems} cartItems={cartItems} />
      </main>
    </div>
  );
}

export default App;
