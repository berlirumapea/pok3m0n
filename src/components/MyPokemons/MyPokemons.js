import React from "react";
import { usePageTitle } from "../../hooks/usePageTitle";
import PokemonList from "../PokemonList/PokemonList";
import { PokemonContext } from "../../context";

const MyPokemons = props => {
  usePageTitle("My Pokemons");

  const { state } = React.useContext(PokemonContext);

  return (
    <main className="container pokemons-container" data-testid="pokemons">
      <PokemonList pokemons={state.myPokemons} history={props.history} />
    </main>
  );
};

export default MyPokemons;
