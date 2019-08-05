import React from "react";

const Types = ({ types }) => {
  return (
    <div className="types">
      <p className="header-text">Types</p>
      {types &&
        types.map(type => (
          <div className="badge" key={type.type.name} data-testid="type">
            {type.type.name}
          </div>
        ))}
    </div>
  );
};

export default Types;
