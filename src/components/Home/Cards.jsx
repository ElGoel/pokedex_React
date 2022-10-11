import Card from './Card';
import { Link } from 'react-router-dom';
// import { useRef, useCallback } from 'react';

const Cards = ({
  pokemones,
  // isPending,
  // setPage,
  // hasMore,
  // page,
  removeFilters,
  // setTypePages,
  // setLimit,
  // offset,
  // limit
}) => {

/**
 * Metodo para realizar un paginador de scroll infinito, por ahora roto hasta obtener mas información
 * 
  // const intObserver = useRef();
  // const lastCardref = useCallback(
  //   (pokemon) => {
  //     if (isPending) return;

  //     if (intObserver.current) intObserver.current.disconnect();

  //     intObserver.current = new IntersectionObserver((pokemons) => {
  //       if (pokemons[0].isIntersecting && hasMore) {
  //         if (page === 0) {
  //           return;
  //         } else {
  //           setPage((prevPage) => prevPage + 1);
  //           setTypePages(prevOffset => prevOffset + 1);
  //           setLimit(prevLimit => prevLimit + 12);
  //         }
  //       }
  //     });
  //     if (pokemon) intObserver.current.observe(pokemon);
  //   },
  //   [isPending, hasMore]
  // );
 */

  const cardsData = pokemones.map((item, i) => {
    const { data } = item;

    const { front_default } = data.sprites.other["official-artwork"];
    if (pokemones.length === i + 1) {
      return (
        <Link to={`/pokemon/${data.id}`} key={data.id}>
          <div onClick={removeFilters}>
            <Card
              // ref={lastCardref} referencia de la ultima carta (break point)
              img={front_default}
              number={data.id}
              name={data.name}
              types={data.types}
            />
          </div>
        </Link>
      );
    }
    return (
      <Link to={`/pokemon/${data.id}`} key={data.id}>
        <Card
          img={front_default}
          number={data.id}
          name={data.name}
          types={data.types}
        />
      </Link>
    );
  });

  return (
    <div className="container--cards">
      <div onClick={removeFilters} className="content--cards">{cardsData}</div>
    </div>
  );
};

export default Cards