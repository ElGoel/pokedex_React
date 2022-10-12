import Cards from './Home/Cards';
import Loader from './Home/Loader';
import NotFound from './Home/NotFound';
import Pagination from './Home/Pagination';
import Search from './Home/Search';
import { useRef } from 'react';

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
  const cardsSection = useRef(null);
  const scrollDown = () => {
    window.scrollTo({
      top: cardsSection.current.offsetTop,
      behavior: 'smooth',
    });
  };
  return (
    <div className="container">
      <section>
        <Search
          searchPokemon={searchPokemon}
          types={types}
          handleClickFilter={handleClickFilter}
          removeFilters={removeFilters}
          handleSearchType={handleSearchType}
          scrollDown={scrollDown}
        />
      </section>
      <section id='cards' className="content">
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
              cardsSection={cardsSection}
            />
            {isPending && <Loader />}
            <Pagination
              setPage={setPage}
              page={page}
              totalPage={totalPage}
              setTypePages={setTypePages}
              setLimit={setLimit}
              pokemonsData={pokemonsData}
            />
          </div>
        ) : (
          <NotFound />
        )}
      </section>
    </div>
  );
};

export default Pokedex