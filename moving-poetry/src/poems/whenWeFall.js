import { withFading, withFullOpacity, identityTransform, animate } from '../animateText.js'

const whenWeFallContent = `
  <p id="p1">när vi faller oundvikligt</p>
  <p id="p2">inför trädens döva öron</p>
  <p id="p3">där stammarna står</p>
  <p id="p4">stumma för vår skam</p>
  <p id="p5">skränar kråkorna tyst</p>
  <p id="p6">– intet är vackert för evigt</p>
`;

let transforms = [
  {}, // absolute positioning, no common transform
  {deltaX: 40},
];
transforms[2] = {startX: transforms[1].deltaX * 4, deltaX: 50};

// define keyframes for each element, relative to its starting position
const p1Keyframes = [
  withFullOpacity(identityTransform),
  withFading(identityTransform),
  withFading({ transform: [`translateX(${transforms[2].startX + transforms[2].deltaX * 5}px) translateY(2.5em)`] }),
];

const p2Keyframes = [
  withFading(identityTransform),
  withFading({ transform: [`translateX(${transforms[1].deltaX * 2}px) translateY(1em)`] }),
  withFading({ transform: [`translateX(${transforms[2].startX + transforms[2].deltaX * 4}px) translateY(3em)`] }),
];

const p3Keyframes = [
  withFading({ transform: ['translateX(19ch) translateY(-2em)'] }),
  withFading({ transform: [`translateX(${transforms[1].deltaX}px) translateY(2em)`] }),
  withFading({ transform: [`translateX(${transforms[2].startX + transforms[2].deltaX * 3}px) translateY(3.5em)`] }),
];

const p4Keyframes = [
  withFading(p3Keyframes[0]),
  withFading({ transform: [`translateX(${transforms[1].deltaX * 3}px) translateY(3em)`] }),
  withFading({ transform: [`translateX(${transforms[2].startX + transforms[2].deltaX * 2}px) translateY(4em)`] }),
];

const p5Keyframes = [
  withFading({ transform: ['translateX(36ch) translateY(-4em)'] }),
  withFading({ transform: [`translateX(${transforms[1].deltaX * 2}px) translateY(4em)`] }),
  withFading({ transform: [`translateX(${transforms[2].startX + transforms[2].deltaX}px) translateY(4.5em)`] }),
];

const p6EndKeyframe = { transform: [`translateX(${transforms[1].deltaX * 4}px) translateY(5em)`] };
const p6Keyframes = [
  withFading(p5Keyframes[0]),
  withFading(p6EndKeyframe),
  withFullOpacity(p6EndKeyframe),
];

function whenWeFallSetup() {
  // animate first transition
  const initialAnimations = {
    p3: p3Keyframes[0],
    p4: p4Keyframes[0],
    p5: p5Keyframes[0],
    p6: p6Keyframes[0],
  }

  for (const [el, keyframes] of Object.entries(initialAnimations)) {
    const element = document.getElementById(el);
    animate(element, keyframes, null, { fill: 'forwards', duration: 0 });
  }
}

function whenWeFallAnimationFactory(animationIndex) {
  return {
    p1: p1Keyframes[animationIndex],
    p2: p2Keyframes[animationIndex],
    p3: p3Keyframes[animationIndex],
    p4: p4Keyframes[animationIndex],
    p5: p5Keyframes[animationIndex],
    p6: p6Keyframes[animationIndex],
  }
}

const whenWeFallNumAnimations = p1Keyframes.length - 1;
export {
  whenWeFallContent,
  whenWeFallSetup,
  whenWeFallAnimationFactory,
  whenWeFallNumAnimations,
}
