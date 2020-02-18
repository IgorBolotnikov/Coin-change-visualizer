const SVG_MARGIN = 100;

export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export function getDarkerColor(color, diff) {
  const red = parseInt(color.slice(1, 3), 16) - diff;
  const green = parseInt(color.slice(3, 5), 16) - diff;
  const blue = parseInt(color.slice(5, 7), 16) - diff;
  return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`
}

export function getCoinRadius(faceValue) {
  const baseRadius = 50;
   return baseRadius + (faceValue - baseRadius) / 3.5;
}

export function checkCollision(r1, x1, y1, r2, x2, y2) {
  return (x2 - x1) ** 2 + (y2 - y1) ** 2 < (r1 + r2) ** 2;
}

// TODO: make coords more structured
export function generateCoinCoords(coins, windowWidth, windowHeight) {
  let coordsArray = [];
  let newCoords = {};
  for (let coin of coins) {
    let collide = true;
    while (collide) {
      newCoords = {
        value: coin,
        x: getRandomInt(SVG_MARGIN, windowWidth - SVG_MARGIN),
        y: getRandomInt(SVG_MARGIN, windowHeight - SVG_MARGIN)
      };
      collide = false;
      for (let otherCoords of coordsArray) {
        if (otherCoords.value && checkCollision(
          getCoinRadius(newCoords.value),
          newCoords.x,
          newCoords.y,
          getCoinRadius(otherCoords.value),
          otherCoords.x,
          otherCoords.y,
        )) {
          collide = true;
        }
      }
      if (!collide) {
        coordsArray.push(newCoords);
      }
    }
  }
  return coordsArray;
}

export function getCoinsArray(change, coins) {
  const array = [];
  for (let coin of coins) {
    if (change[coin] > 0) {
      for (let count = 0; count < change[coin]; count++) {
        array.push(coin);
      }
    }
  }
  return array;
}
