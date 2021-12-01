const oElement = document.getElementById('o');
const fontSize = 'var(--font-size)'; // use the font size defined as a variable in CSS 
const invisibilityClassName = 'invisible'; // class defined in CSS
const animationOptions = {
  duration: 3000,
  fill: 'forwards', // retain the effect after animation is complete
};

document.getElementById('invisible').addEventListener('click', () => {
  // animate font size, starting from the current size, down to 0
  const keyframes = { fontSize: [fontSize, '0'] };
  
  const animation = oElement.animate(keyframes, animationOptions);
  animation.onfinish = () => {
    oElement.classList.add(invisibilityClassName); // hide the element
  };
});

document.getElementById('visible').addEventListener('click', () => {
  // animate font size, starting from 0, up to normal size
  const keyframes = { fontSize: ['0', fontSize] };
  
  oElement.classList.remove(invisibilityClassName); // show the element
  oElement.animate(keyframes, animationOptions);
});