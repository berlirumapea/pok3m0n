import React from "react";
import Types from "./Types";
import pokeball from "../../images/pokeball.png";

const Info = React.memo(
  ({ name, sprites, height, weight, types, isCatching, isOwned = false }) => {
    return (
      <div className="pokemon-card">
        <div className="pokemon-detail">
          <div className="pokemon-image">
            {sprites && (
              <img
                src={sprites.front_default}
                alt={name}
                className="pokemon-picture"
              />
            )}
            {isCatching && (
              <img src={pokeball} alt="pokeball" className="pokemon-ball" data-testid="pokeball-catching" />
            )}
          </div>
          <div className="pokemon-info">
            {isOwned && (
              <div className="badge blue fullWidth" data-testid="isOwned">
                Owned
              </div>
            )}
            <div className="info">
              <label>Name</label>
              <p data-testid="detail-name">{name}</p>
            </div>
            <div className="info">
              <label>Height</label>
              <p data-testid="detail-height">{height / 10} m</p>
            </div>
            <div className="info">
              <label>Weight</label>
              <p data-testid="detail-weight">{weight / 10} kg</p>
            </div>
          </div>
        </div>
        <Types types={types} />
      </div>
    );
  }
);

export default Info;
