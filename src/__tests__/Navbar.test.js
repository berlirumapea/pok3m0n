import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";

afterEach(cleanup);

describe("<Navbar />", () => {
  test("Renders Pokemon List Page", () => {
    const { getByTestId, queryByTestId } = render(<App />);

    // navbar tests
    expect(getByTestId("navbar")).toBeTruthy();
    expect(getByTestId("navbar-title").textContent).toBe("Pokemon List");
    expect(queryByTestId("left-arrow")).toBeNull();
    expect(getByTestId("pokeballs")).toBeTruthy();
  });

  test("click my pokeballs icon and move to my pokemon list page and back", () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(getByTestId("navbar-title").textContent).toBe("Pokemon List");

    fireEvent.click(getByTestId("pokeballs"), { button: 0 });

    expect(getByTestId("navbar-title").textContent).toBe("My Pokemons");

    const leftArrow = getByTestId("left-arrow");

    // contains left arrow
    expect(leftArrow).toBeTruthy();

    fireEvent.click(leftArrow, { button: 0 });

    expect(getByTestId("navbar-title").textContent).toBe("Pokemon List");
  });
});
