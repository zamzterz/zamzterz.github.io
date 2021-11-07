import { reorderElementsKeyframes } from '../animateText.js';

const barbarianContent = `
    <style>
        .wrapper {
            display: flex;
        }
    </style>

    <div class="wrapper">
        <div id="g1_r1">R</div>
        <div id="g1_a1">A</div>
        <div id="g1_b1">B</div>
        <div id="g1_a2">A</div>
        <div id="g1_r2">R</div>
        <div id="g1_b2">B</div>
        <div id="g1_e1">E</div>
        <div id="g1_r3">R</div>

        <div>&nbsp;och&nbsp;</div>

        <div id="g2_f1">F</div>
        <div id="g2_l1">L</div>
        <div id="g2_ae1">Ä</div>
        <div id="g2_d1">D</div>
        <div id="g2_e1">E</div>
        <div id="g2_r1">R</div>
        <div id="g2_f2">F</div>
        <div id="g2_r2">R</div>
        <div id="g2_oe1">Ö</div>
    </div>
`

const barbarianOrder = [
  ['g1_r1', 'g1_a1', 'g1_b1', 'g1_a2', 'g1_r2', 'g1_b2', 'g1_e1', 'g1_r3'],
  ['g1_b2', 'g1_a2', 'g1_r3', 'g1_b1', 'g1_a1', 'g1_r1', 'g1_e1', 'g1_r2']
];
const elderBerryOrder = [
  ['g2_f1', 'g2_l1', 'g2_ae1', 'g2_d1', 'g2_e1', 'g2_r1', 'g2_f2', 'g2_r2', 'g2_oe1'],
  ['g2_f2', 'g2_oe1', 'g2_r1', 'g2_f1', 'g2_ae1', 'g2_d1', 'g2_e1', 'g2_r2', 'g2_l1']
];
const g2_l1 = [
  { opacity: [1] },
  { opacity: [0] },
]

const deltaXInPx = '10';

let barbarianElementOrigin = null;
let elderBerryElementOrigin = null;
function barbarianSetup() {
  barbarianElementOrigin = document.getElementById(barbarianOrder[0][0]).getBoundingClientRect();
  elderBerryElementOrigin = document.getElementById(elderBerryOrder[0][0]).getBoundingClientRect();
}

function barbarianAnimationFactory(animationIndex) {
  const keyframes = {
    ...reorderElementsKeyframes(barbarianElementOrigin, barbarianOrder[animationIndex], animationIndex === 0, 20, deltaXInPx),
    ...reorderElementsKeyframes(elderBerryElementOrigin, elderBerryOrder[animationIndex], animationIndex === 0, 20, deltaXInPx),
  };

  Object.assign(keyframes['g2_l1'].keyframes, g2_l1[animationIndex]);
  return keyframes;
}

const barbarianNumAnimations = 1;
export {
  barbarianContent,
  barbarianSetup,
  barbarianAnimationFactory,
  barbarianNumAnimations,
}
