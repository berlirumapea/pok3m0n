import React from "react";

const PokemonListItem = ({ name, onCLick, nickName }) => {
  return (
    <div className="pokemon-card" data-testid="pokemoncard" onClick={onCLick}>
      {!nickName && <h3 className="pokemon-name">{name}</h3>}
      {nickName && (
        <h3 className="pokemon-name">
          {nickName}{" "}
          <span>({name})</span>
        </h3>
      )}
    </div>
  );
};

export default PokemonListItem;
