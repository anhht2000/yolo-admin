import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeCurrentPage, getAllProduct } from '../../redux/reducers/product.reducer';

interface PaginationProps {
  totalPage: number;
  currentPage: number;
}

export default function Pagination({ totalPage, currentPage }: PaginationProps) {
  const dispatch = useDispatch();
  const _totalPage = [];
  for (let i = 0; i < totalPage; i++) {
    _totalPage.push(i);
  }
  const handleChangePage = (page: number) => {
    const _page = page < 1 || page > totalPage ? 1 : page;
    console.log('page', _page);

    dispatch(changeCurrentPage({ page: _page }));
  };
  return (
    <div className="text-center">
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => {
            handleChangePage(currentPage - 1);
          }}>
          &laquo;
        </button>
        {_totalPage.map((e) => {
          return (
            <button
              className={e + 1 === currentPage ? 'active' : ''}
              key={e}
              onClick={() => {
                handleChangePage(e + 1);
              }}>
              {e + 1}
            </button>
          );
        })}
        <button
          disabled={currentPage === totalPage}
          onClick={() => {
            handleChangePage(currentPage + 1);
          }}>
          &raquo;
        </button>
      </div>
    </div>
  );
}
