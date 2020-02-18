import React from 'react';
import PropTypes from 'prop-types';
import { getRandomInt, getDarkerColor, getCoinRadius } from './../helpers.js'

const COIN_COLORS = {
  1: '#f5b46e',
  2: '#f5c16e',
  5: '#f5d36e',
  10: '#6ef5ea',
  25: '#6eeaf5',
  50: '#6ec1f5',
}

export default function Coin(props) {
  const color = COIN_COLORS[props.faceValue];
  const radius = getCoinRadius(props.faceValue);
  const darkColor = getDarkerColor(color, 70);
  const circleStyle = {
    fill: color,
    cx: props.cx,
    cy: props.cy,
    r: radius,
    stroke: darkColor,
    strokeWidth: 3
  }
  const textStyle = {
    textAnchor: "middle",
    fontFamily: "Galada",
    fontWeight: "500",
    fontSize: radius * 1.2,
    fill: darkColor,
    fontStyle: "italic",
    lineHeight: 1,
    letterSpacing: -3,
  }

  return (
    <g className="coin">
      <circle style={circleStyle}/>
      <text
        x={props.cx}
        y={props.cy}
        style={textStyle}
        dy=".3em"
      >
        {props.faceValue}¢
      </text>
    </g>
  );
}

Coin.propTypes = {
  faceValue: PropTypes.number.isRequired,
  cx: PropTypes.number.isRequired,
  cy: PropTypes.number.isRequired,
}
