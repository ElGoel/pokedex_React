import { Link } from "react-router-dom";

const ChangePage = ({page, setPage, nextPokemon, backPokemon}) => {

  const backPage = () => {
    setPage(prevPage => parseInt(prevPage) - 1);
  }

  const forwardPage = () => {
    setPage(prevPage => parseInt(prevPage) + 1);
  }

  return (
    <div className="nav-buttons">
      <Link className="back" to={`/pokemon/${page === 0 ? 10249 : page}`} reloadDocument>
        <button className="button fill-button" onClick={backPage}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="white"
            className="bi bi-arrow-left-circle-fill"
            viewBox="0 0 16 16"
          >
            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
          </svg>
          <h1 className="nav-buttons__number">N.°{backPokemon.number}</h1>
          <h1 className="nav-buttons__name">{backPokemon.name}</h1>
        </button>
      </Link>
      <Link className="next" to={`/pokemon/${page === 10250 ? 1 : page}`} reloadDocument>
        <button className="button fill-button" onClick={forwardPage}>
          <h1 className="nav-buttons__name">{nextPokemon.name}</h1>
          <h1 className="nav-buttons__number">N.°{nextPokemon.number}</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="white"
            className="bi bi-arrow-right-circle-fill"
            viewBox="0 0 16 16"
          >
            <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
          </svg>
        </button>
      </Link>
    </div>
  );
}

export default ChangePage