import { useState } from "react";

export const Categories = () => {
  const [active, setActive] = useState(0);

  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  const onClickCategori = (index) => {
    setActive(index);
  };
  return (
    <div className="categories">
      <ul>
        {categories.map((value, i) => (
          <li
            key={i}
            onClick={() => onClickCategori(i)}
            className={active === i ? "active" : ""}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
};
