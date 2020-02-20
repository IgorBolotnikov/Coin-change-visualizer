export function getCoinNums(coinSizes, allCoinNums) {
  const coinNums = {};
  coinSizes.forEach((coin) => {
    if (allCoinNums[coin].active) {
      coinNums[coin] = allCoinNums[coin].value;
    }
  });
  return coinNums;
}

export function updateCoinNums(change, coinNums, coins) {
  for (let coin of coins) {
    coinNums[coin] -= change[coin];
  }
}

export function getMaxCoinNum(coinNums, coinSizes) {
  let maxNum = 0;
  for (let coin of coinSizes) {
    maxNum = coinNums[coin] > maxNum ? coinNums[coin] : maxNum;
  }
  return maxNum;
}

export function getMinCoinNum(coinNums, coinSizes) {
  let minNum = getMaxCoinNum(coinNums, coinSizes) + 1;
  for (let coin of coinSizes) {
    minNum = coinNums[coin] < minNum ? coinNums[coin] : minNum;
  }
  return minNum;
}

export function getMinCoins(coinNums, changeSum, coinSizes, prioritization) {
  let minCoins = 0;
  if (prioritization) {
    minCoins = getAmountCoeff(
      coinNums,
      getMinCoinNum(coinNums, coinSizes), coinSizes
    ) * changeSum;
  } else {
    minCoins = changeSum;
  }
  return minCoins
}

export function getAmountCoeff(coinNums, coinAmount, coinSizes) {
  return getMaxCoinNum(coinNums, coinSizes) / coinAmount;
}

// Create an array of length equal to che change sum
// so that each consecutive sum is calculated against prevoius sums
// Each element in the array contains an object, which holds
// the minimum amount of coins to get this sum
// and amount of each coin separately
export function getAmountsArray(changeSum, coinSizes, coinNums, prioritization) {
  // Every amount (except from 0 cents) has maximum amount of coins
  // So that we can compare real values with these biggest amounts
  const entry = {}
  entry.minCoins = getMinCoins(coinNums, changeSum, coinSizes, prioritization);
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

export function getChange(amountsArray, coinNums, coinSizes, prioritization) {
  // Coefficient is used to adjust particular coin 'value' depending on
  // How many coins of this value remain
  let amountCoeff = 1;
  // Iterate through each amount of change in the array
  // Start form amount of 1 coin
  // since the will be no coins for 0 cent amount anyway
  for (let amount = 1; amount < amountsArray.length; amount++) {
    // Check every coin
    let foundChange = false;
    for (let coin of coinSizes) {
      // Omit coins if their value is more than the amount itself, e.g.
      // There is no need to check if change of 3 can be given with 5 cent coin
      if (coin <= amount && coinNums[coin] > 0) {
        if (prioritization) {
          amountCoeff = getAmountCoeff(coinNums, coinNums[coin], coinSizes);
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
      return amountsArray.slice(-1)[0];
    }
  }
  return amountsArray.slice(-1)[0];
}

// let coinNums = getCoinNums(COIN_SIZES);
// for (let count = 0; count < CYCLES_AMOUNT; count++) {
//   const change_sum = getRandomInt(1, MAX_CHANGE);
//   const array = getAmountsArray(change_sum, COIN_SIZES);
//   const change = getChange(array, coinNums);
//   updateCoinNums(change, coinNums);
// }
// if (!WITH_COEFF) {
//   console.log('-- Без приоретизации --');
// } else {
//   console.log('-- С приоретизацией --');
// }
// console.log('Осталось: ');
// for (let coin of COIN_SIZES) {
//   console.log(`${coin}-копеечных: ${coinNums[coin]}`);
// }

// WITH_COEFF = !WITH_COEFF;
//
// coinNums = getCoinNums(COIN_SIZES);
// for (let count = 0; count < CYCLES_AMOUNT; count++) {
//   const change_sum = getRandomInt(1, MAX_CHANGE);
//   const array = getAmountsArray(change_sum, COIN_SIZES);
//   const change = getChange(array, coinNums);
//   updateCoinNums(change, coinNums);
// }
// if (!WITH_COEFF) {
//   console.log('-- Без приоретизации --');
// } else {
//   console.log('-- С приоретизацией --');
// }
// console.log('Осталось: ');
// for (let coin of COIN_SIZES) {
//   console.log(`${coin}-копеечных: ${coinNums[coin]}`);
// }
