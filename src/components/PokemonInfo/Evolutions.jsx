import { Link } from "react-router-dom";

const Evolutions = ({ pokeEvolves, currentPokemon, defaultTypes }) => {
  const evolutionChainOne = pokeEvolves.evolOne.map((item) => {
    return (
      <Link
        to={`/pokemon/${item.id}`}
        className={`evolOne--card evl-card ${currentPokemon == item.id ? 'cursor--disabled' : ''}`}
        key={item.id}
        reloadDocument
      >
        <img
          className={
            currentPokemon == item.id
              ? `border-${item.types[0].type.name}`
              : `hover-${item.types[0].type.name}`
          }
          src={item.sprites.other["official-artwork"].front_default}
          alt="First Evolution"
        />
        <span className="poke-name">
          {item.name.charAt(0).toUpperCase() + item.name.slice(1)}{" "}
          <span className="poke-number">N.°{item.id}</span>
        </span>
        <div className="evol--types">
          {item.types.map((type) => (
            <span className={`type-${type.type.name}`} key={type.type.name}>
              {type.type.name}
            </span>
          ))}
        </div>
      </Link>
    );
  });

  const evolutionChainTwo = pokeEvolves.evolTwo.map((item) => {
    return (
      <Link
        to={`/pokemon/${item.id}`}
        className={`evolTwo--card evl-card ${currentPokemon == item.id ? 'cursor--disabled' : ''}`}
        key={item.id}
        reloadDocument
      >
        <img
          className={
            currentPokemon == item.id
              ? `border-${item.types[0].type.name}`
              : `hover-${item.types[0].type.name}`
          }
          src={item.sprites.other["official-artwork"].front_default}
          alt="First Evolution"
        />
        <span className="poke-name">
          {item.name.charAt(0).toUpperCase() + item.name.slice(1)}{" "}
          <span className="poke-number">N.°{item.id}</span>
        </span>
        <div className="evol--types">
          {item.types.map((type) => (
            <span className={`type-${type.type.name}`} key={type.type.name}>
              {type.type.name}
            </span>
          ))}
        </div>
      </Link>
    );
  });

  return (
    <>
      <div className="container--evolutions">
        <h1 className="title-section">Evolutions</h1>
        <div className="evolution--cards">
          <Link
            to={`/pokemon/${pokeEvolves.default.id}`}
            className={`default--card evl-card ${
              currentPokemon == pokeEvolves.default.id ? "cursor--disabled" : ""
            }`}
            reloadDocument
          >
            <img
              className={
                currentPokemon == pokeEvolves.default.id
                  ? `border-${defaultTypes}`
                  : `hover-${defaultTypes}`
              }
              src={pokeEvolves.default.pokeImage}
              alt="Image Default"
            />
            <span className="poke-name">
              {pokeEvolves.default.name}{" "}
              <span className="poke-number">N.°{pokeEvolves.default.id}</span>
            </span>
            <div className="evol--types">
              {pokeEvolves.default.types &&
                pokeEvolves.default.types.map((type) => (
                  <span
                    className={`type-${type.type.name}`}
                    key={type.type.name}
                  >
                    {type.type.name}
                  </span>
                ))}
            </div>
          </Link>
          {evolutionChainOne.length > 0 && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="80"
              fill="white"
              className="bi bi-caret-right"
              viewBox="0 0 16 16"
            >
              <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z" />
            </svg>
          )}
          {evolutionChainOne.length > 1 ? (
            <div
              className={
                evolutionChainOne.length > 3
                  ? "multiple--evolutionsEevee"
                  : "multiple--evolutions"
              }
            >
              {evolutionChainOne}
            </div>
          ) : (
            evolutionChainOne
          )}
          {evolutionChainTwo.length > 0 && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="80"
              fill="white"
              className="bi bi-caret-right"
              viewBox="0 0 16 16"
            >
              <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z" />
            </svg>
          )}
          {evolutionChainTwo.length > 1 ? (
            <div className="double--evolutions">{evolutionChainTwo}</div>
          ) : (
            evolutionChainTwo
          )}
        </div>
      </div>
    </>
  );
};

export default Evolutions;
