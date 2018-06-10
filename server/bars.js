function getRandom(min, max) {
  return Math.floor(Math.random() * ((max + 1) - min)) + min;
}

function generateBars() {
  const buttons = [];
  const buttonCount = getRandom(4, 6);
  for (let i = 0; i < buttonCount; i += 1) {
    buttons.push(getRandom(-50, 50));
  }
  const limit = getRandom(50, 300);
  const bars = [];
  const barCount = getRandom(2, 5);
  for (let i = 0; i < barCount; i += 1) {
    bars.push(getRandom(0, limit));
  }
  return {
    buttons,
    bars,
    limit,
  };
}

module.exports = generateBars;
