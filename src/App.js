import React from "react";
import { PokemonProvider } from "./context";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Pokemons from "./components/Pokemons/Pokemons";
import PokemonDetail from "./components/PokemonDetail/PokemonDetail";
import MyPokemons from "./components/MyPokemons/MyPokemons";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <PokemonProvider>
      <Router>
        <Navbar />
        <main>
          <Switch>
            <Route exact path="/" component={Pokemons} title="Pokemon List" />
            <Route path="/detail/:idx" component={PokemonDetail} />
            <Route path="/mine/" component={MyPokemons} />
          </Switch>
        </main>
      </Router>
    </PokemonProvider>
  );
}

export default App;
