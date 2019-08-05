import React from "react";

const Stat = React.memo(({ stats }) => {
  return (
    <div className="pokemon-card more-info">
      <p className="header-text">Stats</p>
      {stats &&
        stats.reverse().map(stat => {
          return (
            <div className="info hr" key={stat.stat.name} data-testid="stat">
              <label>{stat.stat.name}</label>
              <p>{stat.base_stat}</p>
            </div>
          );
        })}
    </div>
  );
});

export default Stat;
