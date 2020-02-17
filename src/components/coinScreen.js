import React from 'react';
import PropTypes from 'prop-types';

export default function CoinScreen(props) {
  const style = {
    width: props.width,
    height: props.height,
    backgroundColor: "#f5f5dc"
  }

  return (
    <svg style={style}>
      {props.children}
    </svg>
  );
}

CoinScreen.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
}
