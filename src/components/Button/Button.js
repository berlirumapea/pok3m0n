import React from "react";
import PropTypes from "prop-types";

const Button = ({
  content,
  width,
  backgroundColor,
  onClick,
  styles,
  ...rest
}) => {
  return (
    <button
      className="pokemon-btn"
      style={{ backgroundColor, width, ...styles }}
      onClick={onClick}
      {...rest}
    >
      <span>{content}</span>
    </button>
  );
};

Button.propTypes = {
  width: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
};

Button.defaultProps = {
  width: "auto",
  backgroundColor: "#3488f5"
};

export default Button;
