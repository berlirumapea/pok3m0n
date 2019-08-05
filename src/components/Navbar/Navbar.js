import React from "react";
import { withRouter } from "react-router-dom";
import { PokemonContext } from "../../context";
import pokeballs from "../../images/pokeballs.png";
import leftArrow from "../../images/left-arrow.png";

const Navbar = props => {
  const { state } = React.useContext(PokemonContext);

  const goToMyPokemons = () => props.history.push("/mine");
  const goBack = () => {
    props.history.push("/");

    // idk why this doesn't work in test 😒
    // props.history.goBack("-1");
  }

  return (
    <nav className="navbar" data-testid="navbar">
      <div className="left">
        {props.location.pathname !== "/" && (
          <span className="arrow" onClick={goBack} data-testid="left-arrow">
            <img src={leftArrow} alt="left-arrow" />
          </span>
        )}
        <h2 data-testid="navbar-title">{state.pageTitle}</h2>
      </div>
      {props.location.pathname === "/" && (
        <span
          className="my-pokemons"
          onClick={goToMyPokemons}
          data-testid="pokeballs"
        >
          <img src={pokeballs} alt="my-pokemons" />
        </span>
      )}
    </nav>
  );
};

export default withRouter(Navbar);
