import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import qs from "qs";
import axios from "axios";

import {
  setCategoryId,
  setCurrentPage,
  // setFilters,
} from "../redux/slices/filterSlice";

import { SearchContext } from "../App";

import { Categories } from "../components/Categories";
import { Sort } from "../components/Sort";
import { PizzaBlock } from "../components/PizzaBlock";
import { Skeleton } from "../components/PizzaBlock/Skeleton";
import { Pagination } from "../components/Pagination";

const BASE_URL = "https://630b4196ed18e82516507688.mockapi.io/pizzas?";

export const Home = () => {
  const { searchValue } = useContext(SearchContext);
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filter
  );
  const sortType = sort.sortProperty;

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeleton = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };
  const onChangePage = (page) => {
    dispatch(setCurrentPage(page));
  };

  // useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1));
  //     console.log("params", params);
  //     const sort = sortList.find(
  //       (obj) => obj.sortProperty === params.sortProperty
  //     );

  //     console.log("sort", sort);
  //     dispatch(
  //       setFilters({
  //         ...params,
  //         sort,
  //       })
  //     );
  //   }
  // }, []);

  useEffect(() => {
    setIsLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";
    const sort = sortType;

    axios
      .get(
        `${BASE_URL}page=${currentPage}&limit=4&${category}&sortBy=${sort}&order=desc${search}`
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert("error");
      });

    window.scrollTo(0, 0);
  }, [categoryId, currentPage, searchValue, sortType]);

  // useEffect(() => {
  //   const queryString = qs.stringify({
  //     sortProperty: sort.sortProperty,
  //     categoryId,
  //     currentPage,
  //   });
  //   console.log("queryString", queryString);

  //   navigate(`?${queryString}`);
  // }, [categoryId, currentPage, navigate, sort.sortProperty]);

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
      <div className="content__items">{isLoading ? skeleton : pizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};
