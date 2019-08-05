import React from "react";
import axios from "axios";

import { usePageTitle } from "../../hooks/usePageTitle";
import Moves from "./Moves";
import Stat from "./Stat";
import Info from "./Info";
import Button from "../Button/Button";
import { PokemonContext } from "../../context";
import Modal from "./Modal";

const POKEMON_DETAIL_API_URL = "https://pokeapi.co/api/v2/pokemon/";
const PokemonDetail = props => {
  let idx = props.match.params.idx;
  usePageTitle("Pokemon Detail");
  const { state, dispatch } = React.useContext(PokemonContext);
  const [modal, setModal] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const fetchPokemon = React.useCallback(async () => {
    let url = POKEMON_DETAIL_API_URL + idx;
    const { data } = await axios.get(url);
    dispatch({ type: "FETCH_POKEMON_DETAIL", payload: data });
  }, [idx, dispatch]);

  React.useEffect(() => {
    const fetchPokemmonDetail = async () => {
      await fetchPokemon();
    };

    fetchPokemmonDetail();
  }, [fetchPokemon, dispatch]);

  const fetchCaptureRatePokemon = async () => {
    dispatch({ type: "CHANGE_CATCHING_STATUS", payload: true });

    const { data } = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/${idx}`
    );

    setTimeout(() => {
      if (data.capture_rate > 50) {
        setIsSuccess(true);
        dispatch({
          type: "CATCH_POKEMON",
          payload: {
            id: data.id,
            name: state.pokemon.name,
            url: `${POKEMON_DETAIL_API_URL}/${data.id}/`
          }
        });
      } else {
        setIsSuccess(false);
      }

      setModal(true);
      dispatch({ type: "CHANGE_CATCHING_STATUS", payload: false });
    }, 2000);
  };

  const catchPokemon = () => {
    let isOwned = state.myPokemons.findIndex(
      pokemon =>
        pokemon.url.split("/")[pokemon.url.split("/").length - 2] === idx
    );
    if (isOwned !== -1) return;

    // scrolling to top
    // if c finally 0, stop raf
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
      window.requestAnimationFrame(catchPokemon);
      window.scrollTo(0, c - c / 12);
    } else {
      fetchCaptureRatePokemon();
    }
  };

  const releasePokemon = () => {
    dispatch({ type: "RELEASE_POKEMON", payload: idx });
  };

  const closeModal = () => setModal(false);

  const openPokemonList = () => {
    setModal(false);
    props.history.replace("/mine");
  };

  const isOwned = () => {
    if (state.myPokemons.length) {
      return (
        state.myPokemons.findIndex(
          pokemon =>
            pokemon.url.split("/")[pokemon.url.split("/").length - 2] === idx
        ) !== -1
      );
    }

    return false;
  };

  return (
    <main className="container pokemon-detail-container">
      {modal && (
        <Modal
          isSuccess={isSuccess}
          closeModal={closeModal}
          openPokemonList={openPokemonList}
          id={idx}
        />
      )}
      <Info
        name={state.pokemon.name}
        sprites={state.pokemon.sprites}
        height={state.pokemon.height}
        weight={state.pokemon.weight}
        types={state.pokemon.types}
        isCatching={state.isCatching}
        isOwned={isOwned()}
      />
      <Stat stats={state.pokemon.stats} />
      <Moves moves={state.pokemon.moves} />

      {isOwned() && (
        <Button
          content="Release Pokemon"
          styles={{ marginTop: "1rem", fontSize: "1.2rem" }}
          onClick={releasePokemon}
          data-testid="rleease-pokemon"
          backgroundColor="red"
        />
      )}

      {!isOwned() && (
        <Button
          content="Catch This Pokemon"
          styles={{ marginTop: "1rem", fontSize: "1.2rem" }}
          onClick={catchPokemon}
          data-testid="catch-pokemon"
        />
      )}
    </main>
  );
};

export default PokemonDetail;
