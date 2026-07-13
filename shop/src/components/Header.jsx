import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import Order from "./Order";

const showOrders = (props) => {
  let summa = 0;
  props.orders.forEach((el) => (summa += Number.parseFloat(el.price)));
  return (
    <div>
      {props.orders.map((el) => (
        <Order onDelete={props.onDelete} key={el.id} item={el} />
      ))}
      <p className="summa">Сумма: {new Intl.NumberFormat().format(summa)}$</p>
    </div>
  );
};

const showNothing = () => {
  return (
    <div className="empty">
      <h2>Товаров нет</h2>
    </div>
  );
};

export default function Header(props) {
  let [cartOpen, setCartOpen] = useState(false);

  const navItems = [
    { key: "about", label: "Про нас" },
    { key: "contacts", label: "Контакты" },
    { key: "account", label: "Кабинет" },
  ];

  return (
    <header>
      <div className="top-bar">
        <button className="logo" onClick={() => props.onNavigate("catalog")}>
          House Staff
        </button>
        <div className="nav-cart">
          <ul className="nav">
            {navItems.map((item) => (
              <li key={item.key}>
                <button
                  className={props.activePage === item.key ? "active" : ""}
                  onClick={() => props.onNavigate(item.key)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
          <FaShoppingCart
            onClick={() => setCartOpen((cartOpen = !cartOpen))}
            className={`shop-cart-button ${cartOpen && "active"}`}
          />
        </div>

        {cartOpen && (
          <div className="shop-cart">
            {props.orders.length > 0 ? showOrders(props) : showNothing()}
          </div>
        )}
      </div>
      <div className="presentation"></div>
    </header>
  );
}
