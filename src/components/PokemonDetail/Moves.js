import React from "react";

const Moves = React.memo(({ moves }) => {
  return (
    <div className="pokemon-card more-info">
      <p className="header-text">Moves</p>
      {moves &&
        moves.map(move => {
          return (
            <label className="move" key={move.move.name} data-testid="move">
              {move.move.name},{" "}
            </label>
          );
        })}
    </div>
  );
});

export default Moves;
