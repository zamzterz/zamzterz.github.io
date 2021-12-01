const textElement = document.getElementById('text');
const animationOptions = {
  duration: 1000,
  iterations: 9,
  direction: 'alternate', // switch direction after each iteration
  fill: 'forwards',
};

let currentAnimation = null;

document.getElementById('start').addEventListener('click', () => {
  if (currentAnimation) {
    // restart the animation
    currentAnimation.play();
  } else {
    // animate element opacity, from fully opaque to transparent
    const keyframes = { opacity: [1, 0] };
    currentAnimation = textElement.animate(keyframes, animationOptions);
    currentAnimation.onfinish = () => {
      console.log('Animation finished');
    }
    currentAnimation.oncancel = () => {
      console.log('Animation cancelled');
    }
  }
});

document.getElementById('pause').addEventListener('click', () => {
  if (currentAnimation) {
    currentAnimation.pause();
  }
});

document.getElementById('cancel').addEventListener('click', () => {
  if (currentAnimation) {
    currentAnimation.cancel();
  }
});

document.getElementById('finish').addEventListener('click', () => {
  if (currentAnimation) {
    currentAnimation.finish();
  }
});