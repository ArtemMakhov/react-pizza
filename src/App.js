import { useEffect, useState } from "react";

import { Header } from "./components/Header";
import { Categories } from "./components/Categories";
import { Sort } from "./components/Sort";
import { PizzaBlock } from "./components/PizzaBlock";

import "./scss/app.scss";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://630b4196ed18e82516507688.mockapi.io/pizzas")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setItems(data);
      })
      .catch((err) => {
        console.warn(err);
        alert("error");
      });
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {items.map((obj) => (
              <PizzaBlock key={obj.id} {...obj} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
