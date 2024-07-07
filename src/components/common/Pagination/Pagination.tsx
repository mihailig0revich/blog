import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useHistory, useParams } from 'react-router';

import style from './pagination.module.scss';

interface IPagination {
  maxPage: number;
}

function Pagination({ maxPage }: IPagination) {
  const history = useHistory();
  const { activePage = 1 } = useParams<{ activePage: string }>();
  const activeNum = +activePage;
  const pageElements: React.ReactElement[] = [];
  let firstPage = 1;
  let lastPage = 5;

  if (activeNum < maxPage - 2 && activeNum > 2) {
    firstPage = activeNum - 2 < 1 ? 1 : activeNum - 2;
    lastPage = activeNum + 2 < maxPage ? activeNum + 2 : maxPage;
  }
  if (activeNum <= 2) {
    firstPage = 1;
    lastPage = 5;
  }
  if (activeNum >= maxPage - 2) {
    firstPage = maxPage - 4;
    lastPage = maxPage;
  }

  const changePageHandler = (page: number) => {
    history.push(`/articles/${page}`);
  };

  for (let i = firstPage; i <= lastPage; i += 1) {
    const className = `${style.pagination__btn} ${i === activeNum ? style.pagination__btn_active : ''}`;
    pageElements.push(
      <button type="button" onClick={() => changePageHandler(i)} key={i} className={className}>
        {i}
      </button>
    );
  }

  return (
    <div className={style.pagination}>
      <button
        type="button"
        disabled={activeNum === 1}
        className={`${style.pagination__btn} ${style.pagination__arrow}`}
        onClick={() => changePageHandler(activeNum - 1)}
      >
        <svg width="8" height="11" viewBox="0 0 8 11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6.49701 10.4959C6.36446 10.4959 6.23053 10.4521 6.1187 10.3646L0.267188 5.70389C0.124973 5.59042 0.0421295 5.41952 0.0421295 5.23768C0.0421295 5.05721 0.124973 4.88495 0.267188 4.77284L6.09384 0.136706C6.35342 -0.0697388 6.73312 -0.0287232 6.94161 0.228308C7.1501 0.485339 7.10867 0.861316 6.8491 1.06776L1.60787 5.23768L6.87533 9.43358C7.13491 9.64003 7.17633 10.016 6.96784 10.273C6.84772 10.4193 6.67375 10.4959 6.49701 10.4959Z"
            fill="black"
            fillOpacity={activeNum === 1 ? '0.35' : '0.75'}
          />
        </svg>
      </button>
      {pageElements}
      <button
        type="button"
        className={`${style.pagination__btn} ${style.pagination__arrow}`}
        disabled={activeNum === maxPage}
        onClick={() => changePageHandler(activeNum + 1)}
      >
        <svg width="8" height="10" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1.50559 10C1.63834 10 1.77247 9.9583 1.88448 9.87489L7.7449 5.43216C7.88733 5.324 7.9703 5.16109 7.9703 4.98776C7.9703 4.81573 7.88733 4.65153 7.7449 4.54466L1.90937 0.125395C1.6494 -0.0713929 1.26913 -0.0322959 1.06032 0.212712C0.851513 0.45772 0.892998 0.81611 1.15297 1.0129L6.40217 4.98776L1.1267 8.98739C0.866724 9.18418 0.825239 9.54256 1.03405 9.78757C1.15435 9.92702 1.32859 10 1.50559 10Z"
            fill="black"
            fillOpacity={activeNum === maxPage ? '0.35' : '0.75'}
          />
        </svg>
      </button>
    </div>
  );
}

export default Pagination;
