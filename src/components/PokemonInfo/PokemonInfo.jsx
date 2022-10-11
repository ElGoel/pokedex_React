import { Link } from "react-router-dom";
import { useState } from 'react';

const PokemonInfo = ({ pokeInfo, selectedFilter, handleSearchType }) => {
  const [dropDown, setDropDown] = useState(false);

  const dropdownStyle = {
    display: dropDown ? 'block' : 'none',
  }
  

  const altura = (pokeInfo.height * 0.1).toFixed(1);
  const peso = (pokeInfo.weight * 0.1).toFixed(1);

  const statsName = pokeInfo.stats.map((stat) => {
    let statName =
      stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1);
    let statsNameFixed = statName.replace("-", " ");
    const styles = {
      height: `${stat.base_stat / 2}%`,
      backgroundColor: "#30A7D7",
    };
    return (
      <div key={stat.stat.url} className="percentage">
        <div className="percentage--bar">
          <div style={styles} className="percentage--bar_per"></div>
        </div>
        <h1>{statsNameFixed}</h1>
      </div>
    );
  });

  const handleClick = (event) => {
    const { textContent } = event.target;
    selectedFilter(textContent);
    setTimeout(() => {
      handleSearchType();
    }, 200);
  };

  const pokemonTypes = pokeInfo.types.map((type) => (
    <Link
      to="/"
      onClick={handleClick}
      className={`type-${type.type.name}`}
      key={type.type.name}
    >
      {type.type.name}
    </Link>
  ));

  const pokemonWeakness = pokeInfo.weakness.map((type) => {
    const { double_damage_from } = type.data.damage_relations;
    return double_damage_from.map((weakness) => (
      <div key={weakness.name}>
        <Link to="/" onClick={handleClick} className={`type-${weakness.name}`}>
          {weakness.name}
        </Link>
      </div>
    ));
  });

  const abilitiesFix = pokeInfo.abilities.map((abilitie) => {
    const spacedName = abilitie.ability.name.replace("-", " ");
    return <h2 key={abilitie.ability.name}>{spacedName}</h2>;
  });

  const handleDropDown = () => {
    setDropDown(prevDropDown => !prevDropDown);
  };

  return (
    <div className="content-position">
      <div className="title--pokemon">
        <h1>
          {pokeInfo.name} <span>N.°{pokeInfo.id}</span>
        </h1>
      </div>
      <div className="content--varieties">
        <button onClick={handleDropDown} className="varietiesBtn">
          {pokeInfo.name}
          {!dropDown ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-caret-down"
              viewBox="0 0 16 16"
            >
              <path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-caret-up"
              viewBox="0 0 16 16"
            >
              <path d="M3.204 11h9.592L8 5.519 3.204 11zm-.753-.659 4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659z" />
            </svg>
          )}
        </button>
        <div style={dropdownStyle} className="dropdown-content">
          {pokeInfo.varieties.map((varietie) => (
            <Link
              to={`/${varietie.pokemon.url.slice(26, -1)}`}
              key={varietie.pokemon.name}
              value={varietie.pokemon.name}
              reloadDocument
            >
              {varietie.pokemon.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="content--pokemon">
        <div className="content--pokemon_img">
          <img src={pokeInfo.pokemonImage} alt="pokemon Image" />
          <div className="content--stats">
            <h1>Stats</h1>
            <div className="content--pokemon_estadisticas">{statsName}</div>
          </div>
        </div>
        <div className="content--pokemon_info">
          <div>
            <p>{pokeInfo.description[2]}</p>
          </div>
          <div className="content--pokemon_description">
            <div>
              <h1>Height</h1>
              <h2>{altura} m</h2>
            </div>
            <div>
              <h1>weight</h1>
              <h2>{peso} kg</h2>
            </div>
            <div>
              <h1>Category</h1>
              <h2>{pokeInfo.category}</h2>
            </div>
            <div>
              <h1>Abilities</h1>
              {abilitiesFix}
            </div>
          </div>
          <div className="content--pokemon_types">
            <h1>Type</h1>
            <div className="content--pokemon_weakness">{pokemonTypes}</div>
          </div>
          <div className="content--pokemon_types">
            <h1>Weakness</h1>
            <div className="content--pokemon_weakness">{pokemonWeakness}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonInfo;
