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

function getAmountCoeff(coinNums, coinAmount) {
  return getMaxCoinNum(coinNums) / coinAmount;
}

function getCoinNums(coinSizes) {
  const coinNums = {};
  coinSizes.forEach((coin) => {
    coinNums[coin] = COINS_NUMS[coin];
  });
  return coinNums;
}

function updateCoinNums(change, coinNums) {
  for (let coin of COIN_SIZES) {
    coinNums[coin] -= change[coin];
  }
}

function getMaxCoinNum(coinNums) {
  let maxNum = 0;
  for (let coin of COIN_SIZES) {
    maxNum = coinNums[coin] > maxNum ? coinNums[coin] : maxNum;
  }
  return maxNum;
}

function getMinCoinNum(coinNums) {
  let minNum = getMaxCoinNum(COINS_NUMS) + 1;
  for (let coin of COIN_SIZES) {
    minNum = coinNums[coin] < minNum ? coinNums[coin] : minNum;
  }
  return minNum;
}

function getMinCoins()

// Create an array of length equal to che change sum
// so that each consecutive sum is calculated against prevoius sums
// Each element in the array contains an object, which holds
// the minimum amount of coins to get this sum
// and amount of each coin separately
function getAmountsArray(changeSum, coinSizes) {
  // Every amount (except from 0 cents) has maximum amount of coins
  // So that we can compare real values with these biggest amounts
  const entry = {}
  if (WITH_COEFF) {
    entry.minCoins = getAmountCoeff(coinNums, getMinCoinNum(coinNums)) * changeSum;
  } else {
    entry.minCoins = changeSum;
  }
  coinSizes.forEach(coin => { entry[coin] = 0; });
  const amounts = new Array(changeSum + 1);
  amounts.fill(0);
  amounts.forEach((elem, index, array) => {
    array[index] = Object.assign({}, entry);
  });
  // Zero amount always has zero coins (obviously)
  amounts[0].minCoins = 0;
  return amounts;
}

function getChange(amountsArray, coinNums) {
  // Coefficient is used to adjust particular coin 'value' depending on
  // How many coins of this value remain
  let amountCoeff = 1;
  // Iterate through each amount of change in the array
  // Start form amount of 1 coin
  // since the will be no coins for 0 cent amount anyway
  for (let amount = 1; amount < amountsArray.length; amount++) {
    // Check every coin
    let foundChange = false;
    for (let coin of COIN_SIZES) {
      // Omit coins if their value is more than the amount itself, e.g.
      // There is no need to check if change of 3 can be given with 5 cent coin
      if (coin <= amount && coinNums[coin] > 0) {
        if (WITH_COEFF) {
          amountCoeff = getAmountCoeff(coinNums, coinNums[coin]);
        }
        // Calculate the difference between the amount and coin value
        const diff = amount - coin;
        // Get the minimum amount of coins which
        // where calculated for that difference
        // and compare 1 current coin + coins at difference
        // with current minCoins which is set for this amount
        // If the sum is less, then override minCoins with the new result,
        // Change all separate coins to values from difference and increment
        // current coin by 1 (the coin which is added at this step)
        if (amountsArray[diff].minCoins + amountCoeff <= amountsArray[amount].minCoins) {
          // Copy all coin values to current amount
          amountsArray[amount] = Object.assign({}, amountsArray[diff]);
          // Increment the minCoins amount
          amountsArray[amount].minCoins += amountCoeff;
          // Increment the current coin count by one
          amountsArray[amount][coin] += 1;
          foundChange = true;
        }
      }
    }
    if (!foundChange) {
      console.log("Didn't find change!");
      console.log(amount);
      return amountsArray.slice(-1)[0];
    }
  }
  return amountsArray.slice(-1)[0];
}

let coinNums = getCoinNums(COIN_SIZES);
for (let count = 0; count < CYCLES_AMOUNT; count++) {
  const change_sum = getRandomInt(1, MAX_CHANGE);
  const array = getAmountsArray(change_sum, COIN_SIZES);
  const change = getChange(array, coinNums);
  updateCoinNums(change, coinNums);
  // console.log(`Для сдачи ${change_sum} коп нужно:`);
  // for (let coin of COIN_SIZES) {
  //   if (change[coin] !== 0) {
  //     console.log(`${coin}-копеечных: ${change[coin]}`);
  //   }
  // }
}
if (!WITH_COEFF) {
  console.log('-- Без приоретизации --');
} else {
  console.log('-- С приоретизацией --');
}
console.log('Осталось: ');
for (let coin of COIN_SIZES) {
  console.log(`${coin}-копеечных: ${coinNums[coin]}`);
}

WITH_COEFF = !WITH_COEFF;

coinNums = getCoinNums(COIN_SIZES);
for (let count = 0; count < CYCLES_AMOUNT; count++) {
  const change_sum = getRandomInt(1, MAX_CHANGE);
  const array = getAmountsArray(change_sum, COIN_SIZES);
  const change = getChange(array, coinNums);
  updateCoinNums(change, coinNums);
}
if (!WITH_COEFF) {
  console.log('-- Без приоретизации --');
} else {
  console.log('-- С приоретизацией --');
}
console.log('Осталось: ');
for (let coin of COIN_SIZES) {
  console.log(`${coin}-копеечных: ${coinNums[coin]}`);
}
