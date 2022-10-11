import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";  
import { pokeApi } from "../api/pokeApi";
import PokemonInfo from "./PokemonInfo/PokemonInfo";
import { Link } from "react-router-dom";
import ChangePage from "./PokemonInfo/ChangePage";
import Evolutions from "./PokemonInfo/Evolutions";

const pokemonState = {
    id: 0,
    name: '',
    pokemonImage: '',
    category: '',
    height: 0,
    weight: 0,
    description: [],
    abilities: [],
    types: [],
    stats: [],
    weakness: [],
    varieties: [],
}

const evolutionChain = {
  default: {},
  evolOne: [],
  evolTwo: []
}

const PokemonPage = ({selectedFilter, handleSearchType}) => {
  const { id } = useParams();
  const [ pokeInfo, setPokeInfo ] = useState(pokemonState);
  const [ page, setPage ] = useState(id);
  const [ nextPokemon, setNextPokemon ] = useState({ name: '', number: 0 });
  const [ backPokemon, setBackPokemon ] = useState({ name: '', number: 0 });
  const [pokeEvolves, setPokeEvolves] = useState(evolutionChain);

  /** HTTP Requests */
  const getSpecies = async(url) => {
    await pokeApi.get(url)
        .then(response => {
            const descriptions = [];
            response.data.flavor_text_entries.forEach(item => {
                const textFixed = item.flavor_text.replace(String.fromCharCode(12), ' ');
                if(item.language.name === 'en') {
                    descriptions.push(textFixed);
                }
            });
            const genera = [];
            response.data.genera.forEach(item => {
                if(item.language.name === 'en') {
                    genera.push(item.genus);
                }
            });
            setPokeInfo(prevState => ({
                ...prevState,
                description: descriptions,
                category: genera[0].substring(0, genera[0].length - 7),
                varieties: response.data.varieties
            }));
            getPokemonEvolvesTo(response.data.evolution_chain.url.slice(26, -1));
        })
  } 
  const getPokemonTypes = async(types) => {
      try {
        const promises = await types.map(async type => {
          return await pokeApi.get(type.type.url);
        }); 
        const results = await Promise.all(promises);
        setPokeInfo(prevState => ({
          ...prevState,
          weakness: results
        }));
      } catch (error) {
        console.log(error);
      }
  } 
  const getPokemonPage = async() => {
    await pokeApi.get(`pokemon/${id}`)
      .then(res => {
        const { data } = res;
      getSpecies(data.species.url);
      getPokemonTypes(data.types);
      const upperName = data.name.charAt(0).toUpperCase() + data.name.substring(1);
      setPokeInfo((prevState) => ({
        ...prevState,
        id: data.id,
        name: upperName,
        pokemonImage: data.sprites.other["official-artwork"].front_default,
        abilities: data.abilities,
        height: data.height,
        weight: data.weight,
        types: data.types,
        stats: data.stats,
      }));
      }).catch(error => console.log(error));
  }
  const getPokemonEvolvesTo = async(data) => {
    await pokeApi.get(`${data}`)
      .then(async res => {
        const evolvesArr = [];
        const { data } = res;
        await pokeApi.get(`pokemon/${data.chain.species.url.split("/")[6]}`)
          .then(res => setPokeEvolves((prevEvolves) => {
            const upperName = res.data.name.charAt(0).toUpperCase() + res.data.name.substring(1);
            return {
              ...prevEvolves,
              default: {
                id: res.data.id,
                name: upperName,
                pokeImage: res.data.sprites.other["official-artwork"].front_default,
                types: res.data.types,
                defaultType: res.data.types[0].type.name
              }
            }
          }))
          .catch(error => console.log(error));
        
        const firstPromise = data.chain.evolves_to.map(async item => {
          if (item.evolves_to.length > 0) {
            item.evolves_to.forEach(async evolve => {
              const resp = await pokeApi.get(`pokemon/${evolve.species.url.split("/")[6]}`);
              const result = await resp.data;
              evolvesArr.push(result);
            })
          }
          const resp = await pokeApi.get(`pokemon/${item.species.url.split("/")[6]}`);
          const result = await resp.data;
          return result;
        });
        const evolvesToFirst = await Promise.all(firstPromise);
        setPokeEvolves(prevEvolves => ({
          ...prevEvolves,
          evolOne: evolvesToFirst,
          evolTwo: evolvesArr
        }))
      })
      .catch(error => console.log(error)); 
  }
  const getNextName = async() => {
    await pokeApi.get(`pokemon/${page >= 10249 ? 1 : parseInt(page) + 1}`)
      .then(res => {
        const {name, id} = res.data;
        setNextPokemon({
          name: name,
          number: id,
        });
      })
      .catch(error => console.log(error));
  }
  const getBackName = async() => {
    await pokeApi.get(`pokemon/${page < 2 ? 10249 : parseInt(page) - 1}`)
      .then(res => {
        const {name, id} = res.data;
        setBackPokemon({
          name: name,
          number: id,
        });
      })
      .catch(error => console.log(error));
  } 
  /** HTTP Requests */

  useEffect(() => {
      getBackName();
      getNextName();
      getPokemonPage();
  }, []);

  return (
    <div className="container">
      <section className="pokemonInfo-header">
        <ChangePage
          pokemon={id}
          setPage={setPage}
          page={page}
          nextPokemon={nextPokemon}
          backPokemon={backPokemon}
        />
      </section>
      <section>
        <div className="content">
          <PokemonInfo
            pokeInfo={pokeInfo}
            selectedFilter={selectedFilter}
            handleSearchType={handleSearchType}
          />
          <Evolutions pokeEvolves={pokeEvolves} currentPokemon={id} defaultTypes={pokeEvolves.default.defaultType} />
          <div className="back-button">
            <Link to="/">
              <button className="button btn-back">Back to the Pokedex</button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PokemonPage