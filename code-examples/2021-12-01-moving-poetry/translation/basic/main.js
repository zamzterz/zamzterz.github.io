const textElement = document.getElementById('text');
const animationOptions = {
  duration: 3000,
  fill: 'forwards',
  easing: 'cubic-bezier(0.5, -0.5, 0.5, 1.5)', // create bouncing effect
};

document.getElementById('start').addEventListener('click', () => {
  // move element to the right and down
  const keyframes = { transform: ['translate(0, 0)', 'translate(50px, 50px)'] };
  textElement.animate(keyframes, animationOptions);
});