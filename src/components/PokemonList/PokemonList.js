import React from "react";
import PokemonListItem from "./PokemonListItem/PokemonListItem";

const PokemonList = ({ pokemons, history }) => {
  const goToPokemonDetail = idx => {
    history.push(`/detail/${idx}`);
  };

  return (
    <>
      {pokemons.length !== 0 &&
        pokemons.map(pokemon => {
          const pokemonIndex = pokemon.url.split("/")[
            pokemon.url.split("/").length - 2
          ];
          return (
            <PokemonListItem
              name={pokemon.name}
              url={pokemon.url}
              key={pokemonIndex}
              nickName={pokemon.nickName || ""}
              onCLick={() => goToPokemonDetail(pokemonIndex)}
            />
          );
        })}
    </>
  );
};

export default PokemonList;
