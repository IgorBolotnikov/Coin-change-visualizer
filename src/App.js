import React, { useEffect, useState } from 'react';
import * as d3 from "d3";

import Coin from './components/coins';
import CoinScreen from './components/coinScreen';
import Sidebar from './components/sidebar';
import {
  InputField,
  SliderField,
  Button,
  Toggle
} from './components/input';
import {
  getRandomInt,
  getCoinRadius,
  generateCoinCoords,
  getCoinsArray
} from './helpers';
import {
  getCoinNums,
  getAmountsArray,
  getChange,
} from './algorithm';


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
  const width = 500;
  const height = 500;
  // const initialCoords = generateCoinCoords(COIN_SIZES, width, height);
  let [coins, setCoins] = useState(COIN_SIZES);
  let [coinNumbers, setCoinNumbers] = useState(COINS_NUMS);
  let [cycles, setCycles] = useState(CYCLES_AMOUNT);
  let [withCoeff, setWithCoeff] = useState(true);
  let [coinCoords, setCoinCoords] = useState([]);
  let [changeRange, setChangeRange] = useState({min: 0, max: 100});
  let [changeValue, setChangeValue] = useState(68);
  let [changeCoins, setChangeCoins] = useState([]);
  let [simulation, setSimulation] = useState(false);

  function handleChangeValueChange(event) {
    setChangeValue(event);
  }

  function handleSimulationChange(event) {
    setSimulation(!simulation);
  }

  function calculateChange(event) {
    event.preventDefault();
    const coinNums = getCoinNums(coins, coinNumbers);
    const array = getAmountsArray(changeValue, coins, coinNums);
    const change = getChange(array, coinNums);
    const coinsArray = getCoinsArray(change, coins);
    const coords = generateCoinCoords(coinsArray, width, height);
    setCoinCoords(coords);
  }

  useEffect(() => {}, [coinCoords])

  return (
    <div className='row no-gutters'>
      <div className='col-md-4'>
        <Sidebar>
          <form>
            <h5 className='text-center mb-1'>Mode</h5>
            <Toggle
              checked={simulation}
              onChange={handleSimulationChange}
              uncheckedText="Normal"
              checkedText="Simulation"
            />
            <h5 className='text-center mb-2 mt-3'>Change amount</h5>
            <SliderField
              minValue={changeRange.min}
              maxValue={changeRange.max}
              value={changeValue}
              onChange={handleChangeValueChange}
            />
            <Button
              onClick={calculateChange}
              text="Calculate"
            />
          </form>
        </Sidebar>
      </div>
      <div className='col-md-8 align-items-center'>
        <CoinScreen
          width={"100%"}
          height={height}
        >
          {coinCoords.length > 0 && coinCoords.map(coin => (
            <Coin
              faceValue={coin.value}
              key={coin.x + ":" + coin.y}
              cx={coin.x}
              cy={coin.y}
            />
          ))}
        </CoinScreen>
      </div>
    </div>
  );
}

export default App;
