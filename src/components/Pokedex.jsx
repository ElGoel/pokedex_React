import Cards from './Home/Cards';
import Loader from './Home/Loader';
import NotFound from './Home/NotFound';
import Pagination from './Home/Pagination';
import Search from './Home/Search';

const Pokedex = ({
  pokemonsData,
  searchPokemon,
  isPending,
  notFound,
  setPage,
  page,
  totalPage,
  setTypePages,
  setLimit,
  hasMore,
  types,
  handleClickFilter,
  removeFilters,
  handleSearchType,
  offset,
  limit
}) => {
  return (
    <div className="container">
      <Search
        searchPokemon={searchPokemon}
        types={types}
        handleClickFilter={handleClickFilter}
        removeFilters={removeFilters}
        handleSearchType={handleSearchType}
      />
      <div className="content">
        {!notFound ? (
          <div>
            <Cards
              pokemones={pokemonsData}
              isPending={isPending}
              setPage={setPage}
              hasMore={hasMore}
              page={page}
              setTypePages={setTypePages}
              setLimit={setLimit}
              offset={offset}
              limit={limit}
              removeFilters={removeFilters}
            />
            {isPending && <Loader />}
            <Pagination
              setPage={setPage}
              page={page}
              totalPage={totalPage}
              setTypePages={setTypePages}
              setLimit={setLimit}
            />
          </div>
        ) : (
          <NotFound />
        )}
      </div>
    </div>
  );
};

export default Pokedex