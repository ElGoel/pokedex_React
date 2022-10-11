import {useState} from 'react';
import Filter from './Filter';

const Search = ({
  searchPokemon,
  types,
  handleClickFilter,
  removeFilters,
  handleSearchType,
}) => {
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    searchPokemon("pokemon", search);
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form--input">
          <label htmlFor="search">Name or Number</label>
          <input
            onChange={handleChange}
            value={search}
            id="search"
            type="text"
            name="search"
          />
        </div>
        <button className="form--submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="white"
            className="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </button>
      </form>
      <Filter
        types={types}
        handleClickFilter={handleClickFilter}
        removeFilters={removeFilters}
        handleSearchType={handleSearchType}
      />
    </>
  );
};

export default Search