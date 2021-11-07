import { animate, defaultAnimationOptions, toggleVisibility, reorderElementsKeyframes, identityTransform, waitForAllAnimations, animateAll } from '../animateText';

const fontSize = '32px';
const deltaXInPx = '19';
const vampiresContent = `
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Courier+Prime&display=swap');

        .content {
            display: flex;
            flex-direction: column;
            align-items: center;
            font-family: 'Courier Prime', monospace;
        }

        .wrapper {
            position: relative;
            padding: 3px;
        }

        .invisible {
            display: none !important;
        }

        #text > div {
            display: inline-block;
        }

        #text {
            font-size: ${fontSize};
        }

        #text:before,
        #text:after {
            color: black;
            content: attr(data-text);
            overflow: hidden;
            position: absolute;
            top: 0;
            left: 0;
        }

        #text:before {
            background: var(--background-color);
            animation: glitch 3s linear infinite;
        }

        #text:after {
            background: var(--background-color);
            animation: glitch 2s linear infinite reverse;
            animation-delay: 1s;
            opacity: 0;
        }

        @keyframes glitch {
            0% {
                clip-path: polygon(0 2%, 100% 2%, 100% 5%, 0 5%);
                transform: translateX(5px);
                opacity: 1;
            }
            10% {
                clip-path: polygon(0 15%, 100% 15%, 100% 15%, 0 15%);
            }
            20% {
                clip-path: polygon(0 10%, 100% 10%, 100% 20%, 0 20%);
            }
            30% {
                clip-path: polygon(0 1%, 100% 1%, 100% 2%, 0 2%);
                transform: translateX(-5px);
            }
            40% {
                clip-path: polygon(0 33%, 100% 33%, 100% 33%, 0 33%);
            }
            50% {
                clip-path: polygon(0 44%, 100% 44%, 100% 44%, 0 44%);
            }
            60% {
                clip-path: polygon(0 50%, 100% 50%, 100% 20%, 0 20%);
                transform: translateX(5px);
            }
            70% {
                clip-path: polygon(0 70%, 100% 70%, 100% 70%, 0 70%);
            }
            80% {
                clip-path: polygon(0 80%, 100% 80%, 100% 80%, 0 80%);
            }
            90% {
                clip-path: polygon(0 50%, 100% 50%, 100% 55%, 0 55%);
                transform: translateX(0);
            }
            100% {
                clip-path: polygon(0 70%, 100% 70%, 100% 80%, 0 80%);
                opacity: 1;
            }
        }
    </style>
    <div class="content">
        <h3>SAKER ATT AKTA SIG FÖR BLAND</h3>
        <div class="wrapper">
            <div id="text" data-text="SVAMPAR OCH MYRMARKEN">
                <div id="s1">S</div><div id="v1">V</div><div id="a1">A</div><div id="m1">M</div><div id="p1">P</div><div id="a2">A</div><div id="r1">R</div><div id="space1">&nbsp</div><div id="o1">O</div><div id="c1">C</div><div id="h1">H</div><div id="space2">&nbsp</div><div id="m2">M</div><div id="y1">Y</div><div id="r2">R</div><div id="m3">M</div><div id="a3">A</div><div id="r3">R</div><div id="k1">K</div><div id="e1">E</div><div id="n1">N</div>
            </div>
        </div>
    </div>
`;
const lines = [
  'SVAMPAR OCH MYRMARKEN',
  'VAMPYRER',
  'PYROMANER',
  'SOMMAREN',
  'ROMANSER',
  'MACHOMANSKRYP',
  'NORMER',
  'MAMMORS NYCKER',
  'ARMVECKSNYP',
  'RYSKA VAPEN',
  'KAMERORS VY',
  'VECKANS HYRPORR',
  'VACKRARE PAR',
  'SKAMMEN',
  'AVSMAKEN',
];

function computeElements(line) {
  const seenChars = {};
  return line.split('').map((char) => {
    if (!(char in seenChars)) {
      seenChars[char] = 1;
    }
    const count = seenChars[char]++;
    const element = `${char !== ' ' ? char.toLowerCase() : 'space'}${count}`;
    return element;
  });
}

const visibilityAnimationOptions = {
  ...defaultAnimationOptions,
  duration: 500,
}
const reorderAnimationOptions = {
  ...defaultAnimationOptions,
  duration: 500,
}
const msBeforeNextTransition = 2000;
let currentLineIndex = 0;
let currentAnimations = {};
const allElements = computeElements(lines[0]);

function moveElementsToOriginalPosition(elements) {
  const animations = {};
  for (const el of elements) {
    const element = document.getElementById(el);
    animations[el] = animate(element, identityTransform, null, {...reorderAnimationOptions, delay: msBeforeNextTransition});
  }

  return animations;
}

function reorderElements(visibleCharElements, currentLineIndex) {
  const elementOrigin = document.getElementById('text').getBoundingClientRect();
  const nextAnimationData = reorderElementsKeyframes(elementOrigin, visibleCharElements, currentLineIndex === 0, 0, deltaXInPx, reorderAnimationOptions);
  return animateAll(nextAnimationData, currentAnimations);
}

function logUnexpectedAnimationError(error) {
  if (error.name === 'AbortError') {
    // the animation was cancelled, not a problem
    return;
  }

  console.log(error);
}

function vampiresSetup() {
  currentLineIndex = 0;
  startAnimations();
}

function startAnimations() {
  const visibleCharElements = computeElements(lines[currentLineIndex]);
  const invisibleElements = allElements.filter(e => !visibleCharElements.includes(e));

  document.getElementById('text').setAttribute('data-text', ''); // empty it to avoid it moving around while animating elements
  currentAnimations = toggleVisibility(visibleCharElements, invisibleElements, 'invisible', fontSize, visibilityAnimationOptions);

  waitForAllAnimations(currentAnimations).then(() => {
    currentAnimations = reorderElements(visibleCharElements, currentLineIndex);

    waitForAllAnimations(currentAnimations).then(() => {
      document.getElementById('text').setAttribute('data-text', lines[currentLineIndex]);
      currentLineIndex = (currentLineIndex + 1) % lines.length;
      currentAnimations = moveElementsToOriginalPosition(visibleCharElements);

      waitForAllAnimations(currentAnimations).then(startAnimations).catch(logUnexpectedAnimationError);
    }).catch(logUnexpectedAnimationError);
  }).catch(logUnexpectedAnimationError);
}

function vampiresDestroy() {
  for (const [_, animation] of Object.entries(currentAnimations)) {
    animation.cancel();
  }
  currentAnimations = {};
}

const vampiresAnimationFactory = () => ({});
const vampiresNumAnimations = 0;
export {
  vampiresContent,
  vampiresSetup,
  vampiresDestroy,
  vampiresAnimationFactory,
  vampiresNumAnimations,
};
