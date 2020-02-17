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
   return baseRadius + (faceValue - baseRadius) / 2.5;
}

export function checkCollision(r1, x1, y1, r2, x2, y2) {
  return (x2 - x1) ** 2 + (y2 - y1) ** 2 < (r1 + r2) ** 2;
}

export function generateCoinCoords(coins, windowWidth, windowHeight) {
  const coords = {};
  for (let coin of coins) {
    let collide = true;
    while (collide) {
      console.log(coin);
      coords[coin] = {
        x: getRandomInt(100, windowWidth - 100),
        y: getRandomInt(100, windowHeight - 100)
      };
      collide = false;
      for (let otherCoin of coins) {
        if (coords[otherCoin]) {
          if (coords[otherCoin] !== coords[coin] && checkCollision(
            getCoinRadius(coin),
            coords[coin].x,
            coords[coin].y,
            getCoinRadius(otherCoin),
            coords[otherCoin].x,
            coords[otherCoin].y,
          )) {
            collide = true;
          }
        }
      }
    }
  }
  return coords;
}
