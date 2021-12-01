const textElement = document.getElementById('text');
const disappearingElement = document.getElementById('disappearing');
const notDisappearingElement = document.getElementById('notDisappearing');
const animationOptions = {
  duration: 1000,
  fill: 'forwards',
};

document.getElementById('start').addEventListener('click', () => {
  const translateKeyframes = { transform: ['translateX(0)', 'translateX(10px)']};
  disappearingElement.animate(translateKeyframes, animationOptions);
  notDisappearingElement.animate(translateKeyframes, animationOptions);

  // animate element opacity, from fully opaque to transparent
  textElement.animate({ ...translateKeyframes, opacity: [1, 0] }, animationOptions);
});