import React, { useEffect, useState } from 'react';

import Coin from './components/coins';
import {
  InputField,
  SliderField,
  DoubleSliderField,
  Button,
  MenuButton,
  Toggle,
  CheckBox
} from './components/input';
import {
  getRandomInt,
  generateCoinCoords,
  getCoinsArray,
} from './helpers';
import {
  getCoinNums,
  getAmountsArray,
  getChange,
  updateCoinNums
} from './algorithm';
import InfoModal from './components/modal';
import { drawCoinNumbers, clearSVG } from './barchart';
import { MAIN_INFO } from './text';

const COIN_SIZES = [1, 2, 5, 10, 25, 50]; // Can be any amount and any values
const COINS_NUMS = {
  1: {
    value: 10000,
    active: true,
  },
  2: {
    value: 10000,
    active: true,
  },
  5: {
    value: 10000,
    active: true,
  },
  10: {
    value: 10000,
    active: true,
  },
  25: {
    value: 10000,
    active: true,
  },
  50: {
    value: 10000,
    active: true,
  }
};
var PRIORITIZATION = false;

function App() {
  // SVG dimentions
  const width = window.innerWidth;
  const height = window.innerHeight - 54;
  // General coin values
  let [menu, setMenu] = useState(false);
  let [coinNumbers, setCoinNumbers] = useState(COINS_NUMS);
  let [coinCoords, setCoinCoords] = useState([]);

  let [simulation, setSimulation] = useState(false);
  // NORMAL mode
  let [changeRange, setChangeRange] = useState({min: 1, max: 100});
  let [changeValue, setChangeValue] = useState(68);
  // SIMULATION mode
  let [loading, setLoading] = useState(false);
  let [cycles, setCycles] = useState(10000);
  let [coinNumbersSim, setCoinNumbsersSim] = useState(JSON.parse(JSON.stringify(COINS_NUMS)))

  function toggleMenu(event) {
    setMenu(!menu);
  }

  function handleSimulationChange(event) {
    setSimulation(!simulation);
  }

  // Functions for NORMAL mode
  function handleChangeValueChange(event) {
    setChangeValue(event);
  }

  function calculateChange(event) {
    event.preventDefault();
    const coinNums = getCoinNums(COIN_SIZES, coinNumbers);
    const amountsArray = getAmountsArray(
      changeValue,
      COIN_SIZES,
      coinNums,
      PRIORITIZATION
    );
    const change = getChange(amountsArray, coinNums, COIN_SIZES, PRIORITIZATION);
    const coinsArray = getCoinsArray(change, COIN_SIZES);
    const coords = generateCoinCoords(coinsArray, width, height);
    setCoinCoords(coords);
  }

  useEffect(() => {}, [coinCoords])

  // Functions for SIMULATION mode
  function handleCyclesChange(event) {
    setCycles(event);
  }

  function handleCoinNumbersChange(event) {
    const coin = event.target.id;
    const value = Number(event.target.value);
    setCoinNumbsersSim(state => {
      state[coin].value = value > 100000 ? 100000 : value;
      return {...state};
    });
  }

  function handleCoinActiveChange(event) {
    const coin = event.target.id;
    setCoinNumbsersSim(state => {
      state[coin].active = !state[coin].active;
      return {...state};
    });
  }

  function handleChangeRangeChange(event) {
    const newRange = {
      min: event.min || 1,
      max: event.max <= 100 ? event.max : 100
    }
    setChangeRange(newRange);
  }

  function getActiveCoins(coinNums) {
    let array = [];
    for (let coin of COIN_SIZES) {
      if (coinNums[coin].active) {
        array.push(coin);
      }
    }
    return array;
  }

  function handleSimulation(event) {
    event.preventDefault();
    setLoading(true, setTimeout(runSimulation, 100));
  }

  function runSimulation() {
    let counter = 0;
    const coinNumsCollection = {smart: [], dumb: []};
    const activeCoins = getActiveCoins(coinNumbersSim);
    let coinNums = {
      dumb: getCoinNums(activeCoins, coinNumbersSim),
      smart: getCoinNums(activeCoins, coinNumbersSim),
    };
    for (let count = 0; count < cycles; count++) {
      const changeSum = getRandomInt(changeRange.min, changeRange.max);
      // Calculate for Dumb mode
      const amountsArray1 = getAmountsArray(
        changeSum,
        activeCoins,
        coinNums.dumb,
        false
      );
      const change1 = getChange(
        amountsArray1,
        coinNums.dumb,
        activeCoins,
        false
      );
      // Calculate for Smart mode
      const amountsArray2 = getAmountsArray(
        changeSum,
        activeCoins,
        coinNums.smart,
        true
      );
      const change2 = getChange(
        amountsArray2,
        coinNums.smart,
        activeCoins,
        true
      );
      updateCoinNums(change1, coinNums.dumb, activeCoins);
      updateCoinNums(change2, coinNums.smart, activeCoins);
      // Increment counter and optionally collection
      counter += 1;
      if (counter === 100) {
        coinNumsCollection.dumb.push({...coinNums.dumb});
        coinNumsCollection.smart.push({...coinNums.smart});
        counter = 0;
      }
    }
    setLoading(false);
    drawCoinNumbers(activeCoins, coinNumsCollection);
  }

  useEffect(() => {
    if (!simulation) {
      setCoinNumbers(JSON.parse(JSON.stringify(COINS_NUMS)));
      clearSVG();
    }
  }, [simulation])

  return (
    <React.Fragment>
      <nav className='navbar navbar-minimal d-flex justify-content-end'>
        <MenuButton
          onClick={toggleMenu}
          text="≡"
        />
        <div className="mr-3">
          <InfoModal
            title="Introduction"
            body={MAIN_INFO}
          />
        </div>
        <div>
          {simulation ? (
            <Button
              onClick={handleSimulation}
              text="Run simulation"
            />
          ) : (
            <Button
              onClick={calculateChange}
              text="Get change"
            />
          )}
        </div>
      </nav>
      <div className={menu ? "pt-4 pb-4 pl-4 pr-4 sidebar" : "pt-4 pb-4 sidebar sidebar-hidden"}>
        <button className="sidebar-close text-white" onClick={toggleMenu}>&times;</button>
        <form>
          <h5 className='text-center mb-1'>Mode</h5>
          <Toggle
            checked={simulation}
            onChange={handleSimulationChange}
            uncheckedText="Normal"
            checkedText="Simulation"
          />
          {simulation ? (
            <React.Fragment>
              <h5 className='text-center mb-2 mt-3'>Clients</h5>
              <SliderField
                minValue={1000}
                maxValue={100000}
                value={cycles}
                onChange={handleCyclesChange}
                step={1000}
              />
              <h5 className='text-center mb-2 mt-3'>Change range</h5>
              <DoubleSliderField
                minValue={1}
                maxValue={100}
                value={changeRange}
                onChange={handleChangeRangeChange}
                step={1}
                format={" ¢"}
              />
              <h5 className='text-center mb-2 mt-3'>Coins</h5>
              {COIN_SIZES.map(coin => (
                <div
                  key={coin}
                  className="mb-2 d-flex text-white justify-content-center align-items-center"
                >
                  <div className={coinNumbersSim[coin].active ? "" : "disabled-field"}>
                    <label htmlFor={coin} className="checkbox-container">
                      {coin}¢ &times;
                      <CheckBox
                        id={coin}
                        checked={coinNumbersSim[coin].active}
                        onChange={handleCoinActiveChange}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <div className={coinNumbersSim[coin].active ? "" : "disabled-field"}>
                    <InputField
                      id={coin}
                      value={coinNumbersSim[coin].value}
                      onChange={handleCoinNumbersChange}
                      type="number"
                      placeholder="Amount"
                      step={100}
                      disabled={!coinNumbersSim[coin].active}
                    />
                  </div>
                </div>
              ))}
              <br/>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <h5 className='text-center mb-2 mt-3'>Change amount</h5>
              <SliderField
                minValue={changeRange.min}
                maxValue={changeRange.max}
                value={changeValue}
                onChange={handleChangeValueChange}
                format={" ¢"}
              />
            </React.Fragment>
          )}
        </form>
      </div>
      {loading ? (
        <div className="lds-grid">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : ("")}
      <svg className="main-screen">
        {coinCoords.length > 0 && !simulation && coinCoords.map(coin => (
          <Coin
            faceValue={coin.value}
            key={coin.x + ":" + coin.y}
            cx={coin.x}
            cy={coin.y}
          />
        ))}
      </svg>
    </React.Fragment>
  );
}

export default App;
