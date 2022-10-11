const Pagination = ({setPage, page, totalPage, setTypePages, setLimit}) => {

const firstPage = () => {
  setPage(0);
  setTypePages(1);
  setLimit(0);
}

const previousPage = () => {
  setPage(prev => prev - 1);
  setTypePages(prev => prev - 1);
  setLimit(prev => prev - 12);
}


const nextPage = () => {
  setPage(prev => prev + 1);
  setTypePages(prev => prev + 1);
  setLimit(prev => prev + 12);
}

const lastPage = () => {
  const nextPage = Math.max(page, totalPage);
  setPage(prev => prev = nextPage);
  // setTypePages(1);
  // setLimit(0);
}

  return (
    <div className="paginator">
      {/* {page > 0 ? (
        <button className="button paginator--firstPage" onClick={firstPage}>
          First Page
        </button>
      ) : (
        ""
      )} */}
      {/* {page > 0 ? (
        <button className="button paginator--prevPage" onClick={previousPage}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-left"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
            />
          </svg>
        </button>
      ) : (
        ""
      )} */}
      {/* <button className="paginator--page" disabled>
        {page < 1 ? "1" : page + 1}
      </button> */}
      {page === totalPage ? (
        ""
      ) : (
        <button
          className="button paginator--nextPage"
          disabled={page === totalPage}
          onClick={nextPage}
        >
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="white"
            className="bi bi-arrow-right-short"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
            />
          </svg> */}
          Load More Pokemons!
        </button>
      )}
      {/* {page === totalPage ? (
        ""
      ) : (
        <button
          className="button paginator--lastPage"
          disabled={page === totalPage}
          onClick={lastPage}
        >
          <p>Last Page</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="white"
            className="bi bi-arrow-right-short"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
            />
          </svg>
        </button>
      )} */}
    </div>
  );
}

export default Pagination