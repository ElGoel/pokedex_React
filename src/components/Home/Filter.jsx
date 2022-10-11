import { useState } from "react";

const style = {
  maxHeight: "2rem",
  open: false,
};

const Filter = ({
  types,
  handleClickFilter,
  removeFilters,
  handleSearchType,
}) => {
  const [styleFilter, setStyleFilter] = useState(style);

  const handleClickToggle = () => {
    setStyleFilter((prevStyle) => {
      if (prevStyle.open) {
        return {
          ...prevStyle,
          maxHeight: "2rem",
          open: false,
        };
      } else {
        return {
          ...prevStyle,
          maxHeight: "inherit",
          open: true,
        };
      }
    });
  };

  const typesSelected = types.filter((type) => type.selected === true);

  return (
    <>
      {!styleFilter.open && typesSelected.length > 0 && (
        <div className="filter--Selected">
          <div className="filter--Selected__content">
            <div className="filter--Selected__text">
              <span className="filter-key">Type:</span>
              {typesSelected.length > 1 ? (
                <span className="filter-value">
                  {typesSelected.length} Selected
                </span>
              ) : (
                <span className="filter-value">{typesSelected[0].name}</span>
              )}
              <div onClick={removeFilters} className="filter-remove">
                <span>x</span>
              </div>
            </div>
          </div>
        </div>
      )}
      <div style={styleFilter} className="filter-section">
        <div className="filter-content">
          <ul>
            {types.map((type) => {
              const checked = {
                backgroundColor: type.selected && "#30a7d7",
              };
              return (
                <li key={type.id}>
                  <span className={`type-${type.name}`}>{type.name}</span>
                  <span
                    onClick={() =>
                      handleClickFilter(type.id, !type.selected && type.name)
                    }
                    id={type.id}
                    className="filter-type"
                    style={checked}
                  >
                    T
                  </span>
                </li>
              );
            })}
          </ul>
          <div className="filter--search">
            <button onClick={removeFilters} className="button reset">
              Reset
            </button>
            <button onClick={handleSearchType} className="button btn-back">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="white"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>{" "}
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="filter-toggle">
        <span onClick={handleClickToggle} className="filter-toggle__button">
          Show Advanced Search{"    "}
          {!styleFilter.open ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-down-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-up-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z" />
            </svg>
          )}
        </span>
      </div>
    </>
  );
};

export default Filter;
