import React from "react";
import pikachu_loading from "../../images/pikachu_loading.gif";

const Loading = ({ message }) => {
  return (
    <div className="loading">
      <img src={pikachu_loading} alt="pikachu_loading" />
      <p data-testid="loading">{message}</p>
    </div>
  );
};

export default Loading;
