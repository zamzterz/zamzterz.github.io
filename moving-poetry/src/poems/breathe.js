import { defaultAnimationOptions } from '../animateText.js';

const breatheContent = `
    <p id="text"></p>
`

const lines = [
  'att andas in, vänta ut',
  'andas ut, vänta in',
  'mellanrummet finns',
  'mellan andetagen',
  'om du bara minns',
]

const animationOptions = {...defaultAnimationOptions, duration: 3000 };

let currentLineIndex = 0;
let currentAnimation = null;
function breatheSetup() {
  currentLineIndex = 0;
  startAnimations();
}

function startAnimations() {
  const element = document.getElementById('text');
  element.textContent = lines[currentLineIndex];
  currentLineIndex = (currentLineIndex + 1) % lines.length;
  currentAnimation = element.animate({ opacity: [0, 1] }, animationOptions);

  currentAnimation.onfinish = () => {
    currentAnimation = element.animate({ opacity: [1, 0] }, animationOptions);
    currentAnimation.onfinish = startAnimations;
  }
}

function breatheDestroy() {
  currentAnimation.cancel();
  currentAnimation = null;
}

const breatheAnimationFactory = () => ({});
const breatheNumAnimations = 0;
export {
  breatheContent,
  breatheSetup,
  breatheDestroy,
  breatheAnimationFactory,
  breatheNumAnimations,
}
