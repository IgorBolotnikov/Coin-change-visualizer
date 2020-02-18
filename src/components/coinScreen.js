import React from 'react';
import PropTypes from 'prop-types';

export default function CoinScreen(props) {
  const style = {
    width: "100%",
    height: props.height,
    backgroundColor: "#f5f5dc",
    overflow: "hidden"
  }

  return (
    <svg style={style}>
      {props.children}
    </svg>
  );
}

CoinScreen.propTypes = {
  height: PropTypes.number.isRequired
}
