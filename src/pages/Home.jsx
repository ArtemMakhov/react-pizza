import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Categories } from "../components/Categories";
import { Sort } from "../components/Sort";
import { PizzaBlock } from "../components/PizzaBlock";
import { Skeleton } from "../components/PizzaBlock/Skeleton";
import { Pagination } from "../components/Pagination";

import { fetchPizzas } from "../redux/slices/pizzaSlice";
import { pizzaSelector } from "../redux/selectors/pizzaSelector";
import { filterSelector } from "../redux/selectors/filterSelector";
import { setCategoryId, setCurrentPage } from "../redux/slices/filterSlice";

const BASE_URL = "https://630b4196ed18e82516507688.mockapi.io/pizzas?";

export const Home = () => {
  const dispatch = useDispatch();

  const { items, status } = useSelector(pizzaSelector);
  const { categoryId, sort, currentPage, searchValue } =
    useSelector(filterSelector);
  const sortType = sort.sortProperty;

  const pizzas = items.map((obj) => (
    <Link key={obj.id} to={`/pizza/${obj.id}`}>
      <PizzaBlock {...obj} />
    </Link>
  ));
  const skeleton = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };
  const onChangePage = (page) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";
    const sort = sortType;

    dispatch(fetchPizzas({ BASE_URL, currentPage, category, sort, search }));

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    getPizzas();
  }, [categoryId, currentPage, searchValue, sortType]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          onChangeCategory={onChangeCategory}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div>
          <h2>Произошла ошибка 😞</h2>
          <p>К сожалению, не удалось получить пиццы</p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeleton : pizzas}
        </div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};
