import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.scss";

type PropsType = {
  currentPage: number;
  onChangePage: any;
};

export const Pagination: React.FC<PropsType> = ({
  currentPage,
  onChangePage,
}) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(e) => onChangePage(e.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={currentPage - 1}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  );
};
