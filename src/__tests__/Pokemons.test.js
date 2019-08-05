import React from "react";
import {
  render as rtlRender,
  cleanup,
  waitForElement,
  waitForDomChange,
  fireEvent
} from "@testing-library/react";

import { act } from "react-dom/test-utils";
import axiosMock from "axios";

import { PokemonProvider } from "../context";
import Pokemons from "../components/Pokemons/Pokemons";
import App from "../App";
afterEach(cleanup);

function render(ui) {
  function Wrapper(props) {
    return <PokemonProvider {...props} />;
  }

  return rtlRender(ui, { wrapper: Wrapper });
}

describe("<Pokemons />", () => {
  test("fetch and display pokemons", async () => {
    axiosMock.get.mockResolvedValueOnce({
      data: {
        results: [
          { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
          { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" }
        ]
      }
    });

    const { getByTestId, getAllByTestId } = render(<App />);

    // check if it's in pokemon list page
    expect(getByTestId("navbar-title").textContent).toBe("Pokemon List");

    // check if it shows loading state
    expect(getByTestId("loading").textContent).toMatch("Fetching pokemons");

    const resolved = await waitForElement(() => getAllByTestId("pokemoncard"));

    // check if data is resolved
    expect(resolved).toHaveLength(2);

    // if axios.get get called once
    expect(axiosMock.get).toHaveBeenCalledTimes(1);
  });

  test("click one pokemon and move to detail", async () => {
    axiosMock.get.mockResolvedValueOnce({
      data: {
        results: [
          { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
          { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" }
        ]
      }
    });

    const { getAllByTestId, getByTestId } = render(<App />);

    const resolved = await waitForElement(() => getAllByTestId("pokemoncard"));

    // check if pokemon list shows up with 2 items
    expect(resolved).toHaveLength(2);

    // click first child of pokemon items
    act(() => {
      // idk why this still shows act(...) warnings huft
      fireEvent.click(resolved[0], { button: 0 });
    });

    // check if page has been navigated to detail page
    const title = getByTestId(/navbar-title/).textContent;
    expect(title).toBe("Pokemon Detail");
  });

  test("click load more button and fetch more pokemons", async () => {
    axiosMock.get.mockResolvedValueOnce({
      data: {
        results: [
          { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
          { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" }
        ]
      }
    });

    const { getAllByTestId, getByTestId } = render(<Pokemons />);

    const firstFetchPokemons = await waitForElement(() =>
      getAllByTestId("pokemoncard")
    );

    // fetch first 2 pokemons
    expect(firstFetchPokemons).toHaveLength(2);

    axiosMock.get.mockResolvedValueOnce({
      data: {
        results: [
          { name: "rattata", url: "https://pokeapi.co/api/v2/pokemon/19/" },
          { name: "pidgeot", url: "https://pokeapi.co/api/v2/pokemon/18/" }
        ]
      }
    });

    // click load more and fetch more pokemons

    // there is an issue in here:
    // shows warning about "wrapped inot act()" and apparently it is a known
    // issue but i got no time to report it again, i hope it's okay ;)
    fireEvent.click(getByTestId(/loadmore/), { button: 0 });

    const secondFetchPokemons = await waitForDomChange(() => {
      getAllByTestId("pokemoncard");
    });

    // length of pokemons now must be 4
    expect(secondFetchPokemons).toHaveLength(4);
  });
  
});
