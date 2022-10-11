import { useEffect, useState } from 'react'
import { pokeApi } from '../api/pokeApi';
import { uniqueById } from '../helpers/uniqueId';

const useGetPokemons = (page, offset, limit) => {
  const [isPending, setIsPending] = useState(false);
  const [pokemonsData, setPokemonsData] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [isFilter, setIsFilter] = useState(false);
  const [type, setType] = useState("");

  const getPokemons = async() => {
    try {
      setIsPending(true);
      const { data } = await pokeApi.get(
        `pokemon?limit=12&offset=${page * 12}`
      );
      const numberPages = Math.ceil(data.count / 12) - 1;
      setTotalPage(numberPages);
      const promises = await data.results.map(async (pokemon) => {
        const url = pokemon.url.slice(26, -1);
        return await pokeApi.get(url);
      });
      const results = await Promise.all(promises);
      if (!isFilter) {
        setPokemonsData((prevPokemons) => {
          if (prevPokemons) {
            
          }
          return uniqueById([...prevPokemons, ...results]);
        });
      }
      setHasMore(results.length > 0);
      setIsPending(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getFilterTypes = async() => {
    setIsPending(true);
    setIsFilter(true);
    if (type) {
      await pokeApi
        .get(`type/${type}`)
        .then(async (res) => {
          const promises = res.data.pokemon
            .slice(limit, 12 * offset)
            .map(async (pokemon) => {
              const url = pokemon.pokemon.url.slice(26, -1);
              return await pokeApi.get(url);
            });
          const results = await Promise.all(promises);
          setPokemonsData((prevResults) =>
            uniqueById([...prevResults, ...results])
          );
          setIsPending(false);
        })
        .catch((error) => console.log(error));
    } else {
      console.log("no hay tipo");
    }
  };

  useEffect(() => {
    if (isFilter) {
      getFilterTypes();
    } 
    getPokemons();
  }, [page, offset, isFilter]);

  return {
    isPending,
    pokemonsData,
    hasMore,
    setIsPending,
    setPokemonsData,
    totalPage,
    getPokemons,
    getFilterTypes,
    setType,
    isFilter,
    setIsFilter
  };
}

export default useGetPokemons