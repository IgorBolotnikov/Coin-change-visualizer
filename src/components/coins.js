import React from 'react';
import PropTypes from 'prop-types';
import { getRandomInt, getDarkerColor, getCoinRadius } from './../helpers.js'

const COIN_COLORS = {
  1: '#ffdb4d',
  2: '#ffdb4d',
  5: '#ffdb4d',
  10: '#ffdb4d',
  25: '#ffdb4d',
  50: '#ffdb4d',
}

export default function Coin(props) {
  const color = COIN_COLORS[props.faceValue];
  const radius = getCoinRadius(props.faceValue);
  const darkColor = getDarkerColor(color, 50);
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
    <g
      className="coin"
    >
      <circle style={circleStyle}/>
      <text
        x={props.cx}
        y={props.cy}
        style={textStyle}
        dy=".3em"
      >
        {props.faceValue}¢
      </text>
      <path d={`M${props.cx},${props.cy - radius - 2} a1,1 0 0,0 0,${radius * 2 + 4}`}
        fill="yellow"
        opacity=".5"
      />
    </g>
  );
}

Coin.propTypes = {
  faceValue: PropTypes.number.isRequired,
  cx: PropTypes.number.isRequired,
  cy: PropTypes.number.isRequired,
}
