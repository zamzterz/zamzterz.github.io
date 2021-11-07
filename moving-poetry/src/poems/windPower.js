import { defaultAnimationOptions } from '../animateText.js';

const windPowerContent = `
  <p id="p1">ovanför nedsågade trädtoppar</p>
  <p id="p2">vindkraftverkens långsamma snurrande</p>
  <p id="p3">i molnens gråa blick</p>
`;

function generateKeyframes(yOffsets, relative=true) {
  return yOffsets.map((yOffset, index) => {
    const finalTransform = `rotate(360deg) translateY(${yOffset})`;

    // make the transform relative the previous translated position
    const previousYOffset = relative ? (index > 0 ? yOffsets[index - 1] : yOffsets[yOffsets.length - 1]) : '0';
    return { transform: [`rotate(0deg) translateY(${previousYOffset})`, finalTransform]};
  });
}

function setupElement(el) {
  const rotationOriginOffset = '-50px';
  el.style.transformOrigin = `${rotationOriginOffset} 50%`;
  el.style.position = 'fixed';
  el.style.top = `calc(35%)`;
  el.style.left = `calc(50% - ${rotationOriginOffset})`;
  return el;
}

function repeatedAnimation(el, keyframes, animationOptions, index = 0) {
  const keyframeIndex = index % keyframes.length;
  const animation = el.animate(keyframes[keyframeIndex], animationOptions);
  currentAnimations[el.id] = animation;
  animation.onfinish = () => {
    if (index === keyframes.length) {
      index = 0; // avoid overflow
    }
    repeatedAnimation(el, keyframes, animationOptions, index + 1);
  };
}

const animationDuration = 8000;
const animationDelay = 2000;
const animationOptions = {
  ...defaultAnimationOptions,
  endDelay: 3000,
}
const p1Keyframes = generateKeyframes(['0', '2em', '1em']);
const p2Keyframes = generateKeyframes(['1em', '1em', '0']);
const p3Keyframes = generateKeyframes(['2em', '0', '2em']);

const currentAnimations = {};
function windPowerSetup() {
  const p1 = setupElement(document.getElementById('p1'));
  const p1AnimationOptions = {...animationOptions, duration: animationDuration};
  const p2 = setupElement(document.getElementById('p2'));
  const p2AnimationOptions = {...animationOptions, duration: animationDuration - animationDelay, delay: animationDelay};
  const p3 = setupElement(document.getElementById('p3'));
  const p3AnimationOptions = {...animationOptions, duration: animationDuration - animationDelay * 2, delay: animationDelay * 2};

  // separate initial animation that starts from the same origin point for all poem lines
  currentAnimations[p1.id] = p1.animate(generateKeyframes(['0em'], false)[0], p1AnimationOptions)
  currentAnimations[p1.id].onfinish = () => {
    repeatedAnimation(p1, p1Keyframes, p1AnimationOptions, 1);
  };
  currentAnimations[p2.id] = p2.animate(generateKeyframes(['1em'], false)[0], p2AnimationOptions)
  currentAnimations[p2.id].onfinish = () => {
    repeatedAnimation(p2, p2Keyframes, p2AnimationOptions, 1);
  };
  currentAnimations[p3.id] = p3.animate(generateKeyframes(['2em'], false)[0], p3AnimationOptions)
  currentAnimations[p3.id].onfinish = () => {
    repeatedAnimation(p3, p3Keyframes, p3AnimationOptions, 1);
  };
}

function windPowerDestroy() {
  for (const [key, animation] of Object.entries(currentAnimations)) {
    animation.cancel();
    delete currentAnimations[key];
  }
}

const windPowerAnimationFactory = () => ({});
const windPowerNumAnimations = 0;
export {
  windPowerContent,
  windPowerSetup,
  windPowerDestroy,
  windPowerAnimationFactory,
  windPowerNumAnimations,
};
