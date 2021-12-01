const textElement = document.getElementById('text');
const animationOptions = {
  duration: 3000,
  fill: 'forwards',
};
const keyframes = { transform: ['rotate(0deg)', 'rotate(360deg)'] };

document.getElementById('rotateCenter').addEventListener('click', () => {
  // rotate element around its center point
  textElement.style.transformOrigin = 'center';
  textElement.animate(keyframes, animationOptions);
});

document.getElementById('rotateLeft').addEventListener('click', () => {
  // rotate element around its left edge center point
  textElement.style.transformOrigin = 'left center';
  textElement.animate(keyframes, animationOptions);
});

document.getElementById('rotateExternalPoint').addEventListener('click', () => {
  // rotate element around a point below the element
  textElement.style.transformOrigin = '0 40px';
  textElement.animate(keyframes, animationOptions);
});