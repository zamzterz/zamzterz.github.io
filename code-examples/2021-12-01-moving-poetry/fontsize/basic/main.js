const oElement = document.getElementById('o');
const fontSize = 'var(--font-size)'; // use the font size defined as a CSS variable
const animationOptions = {
  duration: 3000,
  fill: 'forwards', // retain the effect after animation is complete
};

document.getElementById('start').addEventListener('click', () => {
  // animate font size, starting from the current size, down to 0
  const keyframes = { fontSize: [fontSize, '0'] };
  oElement.animate(keyframes, animationOptions);
});