import React from "react";
import axios from "axios";
import { usePageTitle } from "../../hooks/usePageTitle";
import Button from "../Button/Button";
import PokemonList from "../PokemonList/PokemonList";
import Loading from "../Loading/Loading";
import { PokemonContext } from "../../context";

const Pokemons = ({ history }) => {
  usePageTitle("Pokemon List");
  const { state, dispatch } = React.useContext(PokemonContext);
  const [next, setNext] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const fetchPokemons = async next => {
    let url = next || "https://pokeapi.co/api/v2/pokemon";
    return await axios.get(url);
  };

  React.useEffect(() => {
    setLoading(true);
    const fetchAllPokemons = async () => {
      const { data } = await fetchPokemons();
      dispatch({ type: "FETCH_POKEMONS", payload: data.results });
      setNext(data.next);
      setLoading(false);
    };
    fetchAllPokemons();
  }, [dispatch]);

  const loadMore = async () => {
    setLoading(true);
    const { data } = await fetchPokemons(next);
    dispatch({ type: "FETCH_POKEMONS_MORE", payload: data.results });
    setNext(data.next);
    setLoading(false);
  };

  return (
    <main className="container pokemons-container" data-testid="pokemons">
      {loading && <Loading message="Fetching pokemons..." />}
      <PokemonList pokemons={state.pokemons} history={history} />
      {state.pokemons.length !== 0 && (
        <Button content="Load More" onClick={loadMore} data-testid="loadmore"/>
      )}
    </main>
  );
};

export default Pokemons;
