import React, { useEffect, useState } from 'react';
import * as d3 from "d3";

import Coin from './components/coins';
import CoinScreen from './components/coinScreen';
import { getRandomInt, getCoinRadius, generateCoinCoords } from './helpers';

const COIN_SIZES = [1, 2, 5, 10, 25, 50]; // Can be any amount and any values
const COINS_NUMS = {
  1: 10000,
  2: 10000,
  5: 9000,
  10: 10000,
  25: 7000,
  50: 7000
};
const MAX_CHANGE = 100;
const CYCLES_AMOUNT = 14000;
var WITH_COEFF = false;

function App() {
  const width = 400;
  const height = 400;
  const initialCoords = generateCoinCoords(COIN_SIZES, width, height);
  let [coins, setCoins] = useState(COIN_SIZES);
  let [coinNums, setCoinNums] = useState(COINS_NUMS);
  let [cycles, setCycles] = useState(CYCLES_AMOUNT);
  let [withCoeff, setWithCoeff] = useState(true);
  let [coinCoords, setCoinCoords] = useState(initialCoords);

  console.log("Rendering circles");
  return (
    <div>
      <CoinScreen
        width={width}
        height={height}
      >
        {coinCoords && COIN_SIZES.map(coin => (
          <Coin
            faceValue={coin}
            key={coin}
            cx={coinCoords[coin].x}
            cy={coinCoords[coin].y}
          />
        ))}
      </CoinScreen>
    </div>
  );
}

export default App;
