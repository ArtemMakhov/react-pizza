type PropsType = {
  categoryId: number;
  onChangeCategory: (idx: number) => void;
};

const categories = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

export const Categories: React.FC<PropsType> = ({
  categoryId,
  onChangeCategory,
}) => {
  return (
    <div className="categories">
      <ul>
        {categories.map((category, i) => (
          <li
            key={i}
            onClick={() => onChangeCategory(i)}
            className={categoryId === i ? "active" : ""}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};
