import React from "react";
import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  act
} from "@testing-library/react";
import App from "../App";
import axiosMock from "axios";
import { Bulbasaur, Pokemons } from "../__mocks__/mockData";

afterEach(cleanup);

describe("<Pokemon Detail />", () => {
  test("fetch list of pokemons and click one", async () => {
    axiosMock.get.mockResolvedValueOnce({
      data: {
        results: Pokemons
      }
    });

    const { getAllByTestId, getByTestId } = render(<App />);

    const resolved = await waitForElement(() => getAllByTestId("pokemoncard"));

    expect(resolved).toHaveLength(2);

    // click first child of pokemon items
    act(() => {
      // idk why this still shows act(...) warnings huft second time
      fireEvent.click(resolved[0], { button: 0 });
    });

    // check if page has been navigated to detail page
    const title = getByTestId(/navbar-title/).textContent;
    expect(title).toBe("Pokemon Detail");
  });

  test("render detail", async () => {
    axiosMock.get.mockResolvedValueOnce({
      data: Bulbasaur
    });

    const { getByTestId, queryByTestId, getAllByTestId } = render(<App />);

    const name = await waitForElement(() => getByTestId("detail-name"));
    const height = await waitForElement(() => getByTestId("detail-height"));
    const weight = await waitForElement(() => getByTestId("detail-weight"));
    const isOwned = queryByTestId("isOwned");
    const stats = await waitForElement(() => getAllByTestId("stat"));
    const moves = await waitForElement(() => getAllByTestId("move"));
    const types = await waitForElement(() => getAllByTestId("type"));

    expect(name.textContent).toBe(Bulbasaur.name);
    expect(height.textContent).toBe(Bulbasaur.height / 10 + " m");
    expect(weight.textContent).toBe(Bulbasaur.weight / 10 + " kg");
    expect(isOwned).toBeNull();
    expect(types).toHaveLength(Bulbasaur.types.length);
    expect(stats).toHaveLength(Bulbasaur.stats.length);
    expect(moves).toHaveLength(Bulbasaur.moves.length);
  });

  test("fail to catch pokemon", async () => {
    const { getByTestId, queryByTestId } = render(<App />);

    const catchButton = getByTestId("catch-pokemon");

    expect(catchButton).toBeTruthy();

    expect(queryByTestId("pokeball-catching")).toBeNull();

    axiosMock.get.mockResolvedValueOnce({
      data: { capture_rate: 45 }
    });

    fireEvent.click(catchButton, { button: 0 });

    expect(
      await waitForElement(() => queryByTestId("pokeball-catching"))
    ).toBeTruthy();

    let modal = await waitForElement(() => getByTestId("modal"));
    let successModal = queryByTestId("success-modal");
    let failModal = await waitForElement(() => queryByTestId("fail-modal"));

    expect(modal).toBeTruthy();
    expect(successModal).toBeNull();
    expect(failModal).toBeTruthy();
  });

  test("success to catch tbe pokemon", async () => {
    const { getByTestId, queryByTestId, getAllByTestId } = render(<App />);

    const catchButton = getByTestId("catch-pokemon");

    expect(catchButton).toBeTruthy();

    expect(queryByTestId("pokeball-catching")).toBeNull();

    axiosMock.get.mockResolvedValueOnce({
      data: { capture_rate: 55 }
    });

    fireEvent.click(catchButton, { button: 0 });

    expect(
      await waitForElement(() => queryByTestId("pokeball-catching"))
    ).toBeTruthy();

    let modal = await waitForElement(() => getByTestId("modal"));
    let successModal = await waitForElement(() =>
      queryByTestId("success-modal")
    );
    let failModal = queryByTestId("fail-modal");

    // modal assertion
    expect(modal).toBeTruthy();
    expect(successModal).toBeTruthy();
    expect(failModal).toBeNull();

    const inputNickName = getByTestId("input-nickname");

    // check if input field renders
    expect(inputNickName).toBeTruthy();

    fireEvent.change(inputNickName, { target: { value: "Kocheng Oren" } });

    expect(inputNickName.value).toBe("Kocheng Oren");

    const submitButton = queryByTestId("submit-button");

    // check if submit button renders
    expect(submitButton).toBeTruthy();

    // click submit
    fireEvent.click(submitButton, { button: 0 });

    const openPokemonListButton = waitForElement(() => queryByTestId('open-mypokemons'));

    // after submit, this should renders
    expect(openPokemonListButton).toBeTruthy();

    fireEvent.click(queryByTestId('open-mypokemons'), { button: 0});

    // my pokemon list assertion
    expect(getByTestId('navbar-title').textContent).toBe("My Pokemons");

    expect(getAllByTestId('pokemoncard')).toHaveLength(1);
  });
});
