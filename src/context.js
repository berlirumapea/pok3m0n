import React from "react";

export const PokemonContext = React.createContext({});
export const PokemonContextConsumer = PokemonContext.Consumer;

const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_TITLE":
      return { ...state, pageTitle: action.payload };
    case "FETCH_POKEMONS":
      return { ...state, pokemons: action.payload };
    case "FETCH_POKEMONS_MORE":
      return { ...state, pokemons: [...state.pokemons, ...action.payload] };
    case "FETCH_POKEMON_DETAIL":
      return { ...state, pokemon: action.payload };
    case "CATCH_POKEMON":
      return { ...state, myPokemons: [...state.myPokemons, action.payload] };
    case "CHANGE_CATCHING_STATUS":
      return { ...state, isCatching: action.payload };
    case "SUBMIT_NICKNAME":
      const myPokemonsWithNickName = state.myPokemons.map(pokemon => {
        if (Number(action.payload.id) === pokemon.id) {
          return { ...pokemon, nickName: action.payload.nickName };
        }
        return pokemon;
      });

      return { ...state, myPokemons: myPokemonsWithNickName };
    case "RELEASE_POKEMON":
      const releasedPokemons = state.myPokemons.filter(
        pokemon => Number(action.payload) !== pokemon.id
      );

      return { ...state, myPokemons: releasedPokemons };
    default:
      return state;
  }
};

const initialState = {
  pokemons: [],
  pokemon: {},
  myPokemons: [],
  isCatching: false,
  pageTitle: "Pokemon List" // default for '/'
};

export function PokemonProvider(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <PokemonContext.Provider value={{ state, dispatch }}>
      {props.children}
    </PokemonContext.Provider>
  );
}
