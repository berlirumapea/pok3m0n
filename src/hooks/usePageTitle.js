import React from "react";
import { PokemonContext } from "../context";

export const usePageTitle = title => {
  const { dispatch } = React.useContext(PokemonContext);

  React.useEffect(() => {
    dispatch({ type: "CHANGE_TITLE", payload: title });
    document.title = title;
  }, [title, dispatch]);
};
