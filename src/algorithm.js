const MAX_CHANGE_SUM = 100; // in coins
const COIN_SIZES = [1, 2, 5, 10, 25, 50]; // Can be any amount and any values

// Create an array of length equal to che change sum
// so that each consecutive sum is calculated against prevoius sums
// Each element in the array contains an object, which holds
// the minimum amount of coins to get this sum
// and amount of each coin separately
function getAmountsArray(changeSum, coinSizes) {
  // Every amount (except from 0 cents) has maximum amount of coins
  // So that we can compare real values with these biggest amounts
  const entry = {minCoins: changeSum};
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

function getMinAmounts(amountsArray) {
  // Iterate through each amount of change in the array
  // Start form amount of 1 coin
  // since the will be no coins for 0 cent amount anyway
  for (let amount = 1; amount < amountsArray.length; amount++) {
    // Check every coin
    for (let coin of COIN_SIZES) {
      // Omit coins if their value is more than the amount itself, e.g.
      // There is no need to check if change of 3 can be given with 5 cent coin
      if (coin <= amount) {
        // Calculate the difference between the amount and coin value
        const diff = amount - coin;
        // Get the minimum amount of coins which
        // where calculated for that difference
        // and compare 1 current coin + coins at difference
        // with current minCoins which is set for this amount
        // If the sum is less, then override minCoins with the new result,
        // Change all separate coins to values from difference and increment
        // current coin by 1 (the coin which is added at this step)
        if (amountsArray[diff].minCoins + 1 < amountsArray[amount].minCoins) {
          // Copy all coin values to current amount
          amountsArray[amount] = Object.assign({}, amountsArray[diff]);
          // Increment the minCoins amount
          amountsArray[amount].minCoins += 1;
          // Increment the current coin count by one
          amountsArray[amount][coin] += 1;
        }
      }
    }
  }
  return amountsArray;
}

const array = getAmountsArray(MAX_CHANGE_SUM, COIN_SIZES);
const results = getMinAmounts(array);

const CHANGE = 56;

console.log(`Для сдачи ${CHANGE} коп нужно ${results[CHANGE].minCoins} монет:`);
for (let coin of COIN_SIZES) {
  if (results[CHANGE][coin] !== 0) {
    console.log(`${coin}-копеечных: ${results[CHANGE][coin]}`);
  }
}
