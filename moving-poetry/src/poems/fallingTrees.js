import { defaultAnimationOptions, identityTransform } from '../animateText.js';

const fallingTreesContent = `
  <style>
    #wrapper {
        transform-origin: 50% calc(100% + 4em);
    }
  </style>

  <div id="wrapper">
    <p id="trees">träd</p>
    <p id="fall">faller</p>
    <p id="not">inte</p>
    <p id="when">när</p>
    <p id="we">vi</p>
    <p id="fell">fäller</p>
    <p id="beautiful">vackra</p>
    <p id="words">ord</p>
  </div>
`;

const finalAnimationTime = 2000;
const finalAnimationOffset = [0.05];
const finalAnimationOptions = {
  ...defaultAnimationOptions,
  delay: finalAnimationTime
}
const treesKeyframes = [
  identityTransform,
  {transform: ['translateY(10em)']},
  {keyframes: {transform: ['rotate(-90deg) translateX(-1.5rem)'], offset: finalAnimationOffset}, animationOptions: finalAnimationOptions},
];

const fallKeyframes = [
  identityTransform,
  {transform: ['translateY(10em)'], opacity: [1]},
  {keyframes: {transform: ['rotate(-90deg)'], opacity: [0], offset: finalAnimationOffset}, animationOptions: finalAnimationOptions},
];

const notKeyframes = [
  identityTransform,
  {transform: ['translateY(4em)']},
  {keyframes: {transform: ['rotate(-90deg) translateY(1em) translateX(-5rem)'], offset: finalAnimationOffset}, animationOptions: finalAnimationOptions},
];

const whenKeyframes = [
  identityTransform,
  {transform: ['translateY(6em)'], opacity: [1]},
  {keyframes: {transform: ['rotate(-90deg)'], opacity: [0], offset: finalAnimationOffset}, animationOptions: finalAnimationOptions},
];

const weKeyframes = [
  identityTransform,
  identityTransform,
  {keyframes: {transform: ['rotate(-90deg) translateX(-2rem)'], offset: finalAnimationOffset}, animationOptions: finalAnimationOptions},
];

const fellKeyframes = [
  identityTransform,
  identityTransform,
  {keyframes: {transform: ['rotate(-90deg) translateX(0.25rem)'], offset: finalAnimationOffset}, animationOptions: finalAnimationOptions},
];

const beautifulKeyframes = [
  identityTransform,
  {transform: ['translateY(1em)']},
  {keyframes: {transform: ['rotate(-90deg) translateY(1em) translateX(1.25rem)'], offset: finalAnimationOffset}, animationOptions: finalAnimationOptions},
];

const wordsKeyframes = [
  identityTransform,
  {transform: ['translateY(1em)']},
  {keyframes: {transform: ['rotate(-90deg) translateY(1em) translateX(6rem)'], offset: finalAnimationOffset}, animationOptions: finalAnimationOptions},
];

const wrapperKeyframes = [
  identityTransform,
  {...identityTransform},
  {keyframes: { transform: ['rotate(90deg)'] }, animationOptions: {...defaultAnimationOptions, duration: finalAnimationTime}}
];

function fallingTreesAnimationFactory(animationIndex) {
  return {
    trees: treesKeyframes[animationIndex],
    fall: fallKeyframes[animationIndex],
    not: notKeyframes[animationIndex],
    when: whenKeyframes[animationIndex],
    we: weKeyframes[animationIndex],
    fell: fellKeyframes[animationIndex],
    beautiful: beautifulKeyframes[animationIndex],
    words: wordsKeyframes[animationIndex],
    wrapper: wrapperKeyframes[animationIndex],
  }
}

const fallingTreesNumAnimations = treesKeyframes.length - 1;
export {
  fallingTreesContent,
  fallingTreesAnimationFactory,
  fallingTreesNumAnimations,
};
