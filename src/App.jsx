import Pokedex from './components/Pokedex';
import PokemonPage from './components/PokemonPage';
import useGetPokemons from './hooks/useGetPokemons';
import { useState, useEffect } from 'react';
import { pokeApi } from './api/pokeApi';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


function App() {
  const [page, setPage] = useState(0);
  const [notFound, setNotFound] = useState(false);
  const [typesFix, setTypesFix] = useState([]);
  const [offset, setoffset] = useState(1);
  const [limit, setLimit] = useState(0);
  const {
    pokemonsData,
    hasMore,
    isPending,
    setIsPending,
    setPokemonsData,
    totalPage,
    getPokemons,
    getFilterTypes,
    setType,
    setIsFilter,
    type
  } = useGetPokemons(page, offset, limit);

  const getTypesFilter = async() => {
    await pokeApi.get(`type`)
      .then(res => {
        const typeFilter = res.data.results.filter(item => item.name !== 'shadow' && item.name !== 'unknown');
        setTypesFix(typeFilter.map((item, i) => (
          {
            id: i + 1,
            name: item.name,
            selected: false      
          }
        )));
      })
      .catch(err => console.log(err));
  }

  const searchPokemon = async(search, id) => {
    if(!id) {
      setNotFound(false);
      setIsFilter(false);
      setPokemonsData([]);
      getPokemons();
    } else {
      setIsPending(true);
    await pokeApi
      .get(`${search}/${id.toLowerCase()}`)
      .then((response) => {
        setPokemonsData([response]);
        setNotFound(false);
      })
      .catch((error) => {
        setNotFound(true);
        console.log(error);
      })
      .then(() => {
        setIsPending(false);
      });
    }
  }

  const handleClickFilter = (id, name) => {
    setType(name);
    setTypesFix(prevTypes => {
      return prevTypes.map(type => type.id === id ? {...type, selected: !type.selected} : type); 
    });
  };

  const selectedFilter = (typeName) => {
    setType(typeName);
    setTypesFix(prevTypes => {
      return prevTypes.map(type => type.name === typeName ? {...type, selected: !type.selected} : type); 
    });
  }

  const handleSearchType = () => {
    if (type) {
      setPokemonsData([]);
      setPage(0);
      setoffset(1);
      setLimit(0);
      getFilterTypes();
    }
  }

  const removeFilters = () => {
    setIsFilter(false);
    setPokemonsData([]);
    setTypesFix(prevTypes => {
      return prevTypes.map(type => {
        return {
          ...type,
          selected: false
        }
      });
    });
    setType("");
    setPage(0);
    setoffset(1);
    setLimit(0);
    setTimeout(() => {
      getPokemons();
    }, 2000);
  };


  useEffect(() => {
    getTypesFilter();
    if (!pokemonsData) {
      getPokemons();
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Pokedex
              pokemonsData={pokemonsData}
              searchPokemon={searchPokemon}
              isPending={isPending}
              notFound={notFound}
              setPage={setPage}
              page={page}
              offset={offset}
              limit={limit}
              totalPage={totalPage}
              setTypePages={setoffset}
              setLimit={setLimit}
              hasMore={hasMore}
              types={typesFix}
              handleClickFilter={handleClickFilter}
              removeFilters={removeFilters}
              handleSearchType={handleSearchType}
            />
          }
        />
        <Route
          path="pokemon/:id"
          element={
            <PokemonPage
              pokemonsData={pokemonsData}
              selectedFilter={selectedFilter}
              handleSearchType={handleSearchType}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App

