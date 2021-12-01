const basicElement = document.getElementById('basic');
const relativeElement = document.getElementById('relative');
const animationOptions = {
  duration: 2000,
  fill: 'forwards',
};
const keyframesList = [
  { transform: ['translateX(30px)', 'translateX(30px) translateY(30px)'] },
  { transform: ['translateX(0) translateY(30px)', 'translateY(0)'] },
];

let currentAnimationIndex = 0;
document.getElementById('next').addEventListener('click', () => {
  const keyframes = keyframesList[currentAnimationIndex % keyframesList.length];

  basicElement.animate(keyframes, animationOptions);
  relativeTransform(relativeElement, keyframes, animationOptions);
  
  currentAnimationIndex += 1;
});

function relativeTransform(element, keyframes, animationOptions) {
  if (!keyframes.transform) {
    // no transform in the keyframes, no need to do anything
    element.animate(keyframes, animationOptions);  
  }

  const finalKeyframes = { ...keyframes };
  const currentTransform = getComputedStyle(element).transform;
  if (currentTransform === 'none') {
    // no transform, zero translate as the starting state
    finalKeyframes.transform = ['translate(0, 0)', ...keyframes.transform];
  } else {
    // set current transform as starting state
    finalKeyframes.transform = [currentTransform, ...keyframes.transform];
  }
  element.animate(finalKeyframes, animationOptions);
}