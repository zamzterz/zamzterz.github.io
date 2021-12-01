const containerElement = document.getElementById('container');
const containerAnimationOptions = {
  duration: 2000,
  fill: 'forwards',
};

const childAnimationOptions = {
  duration: 1000,
  fill: 'forwards',
  delay: containerAnimationOptions.duration, // don't start util parent container animation is done
};

const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
start.addEventListener('click', () => {
  // rotate parent container clockwise
  containerElement.animate({ transform: ['rotate(90deg)'] }, containerAnimationOptions);

  for (let i = 0; i < containerElement.children.length; i++) {
    // rotate child elements counter-clockwise and space them out horizontally
    // NOTE: the order matters, whether the rotation or translation is done first will give different results
    const keyframes = { transform: [`rotate(-90deg) translateX(calc(${i} * 3em))`] }
    containerElement.children[i].animate(keyframes, childAnimationOptions);
  }

  startButton.disabled = true;
  resetButton.disabled = false;
});

resetButton.addEventListener('click', () => {
  const resetAnimationOptions = { duration: 0, fill: 'forwards' };
  const resetKeyframes = { transform: ['rotate(0deg)'] };
  containerElement.animate(resetKeyframes, resetAnimationOptions);

  for (const child of containerElement.children) {
    child.animate(resetKeyframes, resetAnimationOptions);
  }

  resetButton.disabled = true;
  startButton.disabled = false;
});