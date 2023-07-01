import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { setPage } from "../../redux/action";
import style from './Paginate.module.css';

const Paginate = () => {
  const dispatch = useDispatch();
  const dogs = useSelector(state => state.allDogs);
  const currentPage = useSelector(state => state.page);
  const elementsPerPage = useSelector(state => state.elementsForPage);

  const [displayedPages, setDisplayedPages] = useState([]);

  const totalPages = Math.ceil(dogs.length / elementsPerPage);

  const handlePageChange = (pageNumber) => {
    dispatch(setPage(pageNumber));
  };

  useEffect(() => {
    const calculateDisplayedPages = () => {
      const pagesToShow = 5; // Número de páginas a mostrar en la barra de paginación
      const halfRange = Math.floor(pagesToShow / 2);
      let startPage, endPage;

      if (totalPages <= pagesToShow) {
        startPage = 1;
        endPage = totalPages;
      } else if (currentPage <= halfRange) {
        startPage = 1;
        endPage = pagesToShow;
      } else if (currentPage + halfRange >= totalPages) {
        startPage = totalPages - pagesToShow + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - halfRange;
        endPage = currentPage + halfRange;
      }

      setDisplayedPages(Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i));
    };

    calculateDisplayedPages();
  }, [currentPage, totalPages]);

  return (
    <div className={style.pagination}>
      <ul className={style.numPages}>
      <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className={style.button}> Back </button>
        {displayedPages.map((pageNumber) => (
          <li
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={pageNumber === currentPage ? style.currentPage : ""}
          >
            {pageNumber}
          </li>
        ))}
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className={style.button}> Next </button>
      </ul>
    </div>
  );
}

export default Paginate;
