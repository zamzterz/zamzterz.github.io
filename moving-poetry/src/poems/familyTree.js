import { defaultAnimationOptions, identityTransform, toggleVisibility } from '../animateText.js'

const familyTreeContent = `
  <style>
    .invisible {
      display: none !important;
    }

    .wrapper {
      display: flex;
      align-items: baseline;
    }
  </style>

  <div class="wrapper">
    <div id="line1" class="wrapper">
      <div id="p1">F</div>
      <div id="p2">A</div>
      <div id="p3" class="invisible">M</div>
      <div id="p4" class="invisible">I</div>
      <div id="p5" class="invisible">L</div>
      <div id="p6" class="invisible">J</div>
      <div id="p7" class="invisible">E</div>
      <div id="p8" class="invisible">T</div>
      <div id="p9">R</div>
      <div id="p10" class="invisible">Ä</div>
      <div id="p11" class="invisible">D</div>
    </div>
    <div id="line2" class="wrapper">
      <div id="p12" class="invisible">O</div>
      <div id="p13" class="invisible">C</div>
      <div id="p14" class="invisible">H</div>
      <div id="p15">M</div>
      <div id="p16">O</div>
      <div id="p17">R</div>
      <div id="p18" class="invisible">Ö</div>
      <div id="p19" class="invisible">T</div>
      <div id="p20" class="invisible">T</div>
      <div id="p21" class="invisible">E</div>
      <div id="p22" class="invisible">R</div>
    </div>
  </div>
`;

const allElementIds = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9', 'p10', 'p11', 'p12', 'p13', 'p14', 'p15', 'p16', 'p17', 'p18', 'p19', 'p20', 'p21', 'p22'];

const fatherElementIds = ['p1', 'p2', 'p9'];
const motherElementIds = ['p15', 'p16', 'p17'];
const andElementIds = ['p12', 'p13', 'p14'];
const rootEndingElementIds = ['p18', 'p19', 'p20', 'p21', 'p22'];
const rootElementIds = ['p17', ...rootEndingElementIds];
const treeElementIds = ['p8', 'p9',  'p10', 'p11'];

const deltaX = '1rem';
const allTransformKeyframes = [
  [{ transform: identityTransform.transform, elements: allElementIds }],
  [{ transform: `translateX(-${deltaX})`, elements: fatherElementIds }, { transform: `translateX(${deltaX})`, elements: motherElementIds }],
];
allTransformKeyframes.push([...allTransformKeyframes[1], { transform: `translateX(${deltaX})`, elements: rootEndingElementIds }]);
allTransformKeyframes.push([...allTransformKeyframes[2], { transform: `translateX(-${deltaX})`, elements: ['p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p10', 'p11'] }]);
allTransformKeyframes.push([
  ...allTransformKeyframes[3],
  { transform: 'translateY(3rem)', elements: [...andElementIds, ...motherElementIds, ...rootEndingElementIds] },
  { transform: 'translateX(11.5rem)', elements: ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9', 'p10', 'p11'] }
]);
allTransformKeyframes.push(allTransformKeyframes[4]);
allTransformKeyframes.push([]);

/**
 * List of visible elements for each animation stage in order.
 */
const visibleElements = [[...fatherElementIds, ...motherElementIds]];
visibleElements.push([...visibleElements[0], ...andElementIds]);
visibleElements.push([...visibleElements[1], ...rootEndingElementIds]);
visibleElements.push([...visibleElements[2], 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p10', 'p11']);
visibleElements.push(visibleElements[3]);
visibleElements.push([...treeElementIds, ...andElementIds, ...rootElementIds]);
visibleElements.push([...treeElementIds, ...rootElementIds]);

const allVisibleElements = Array.from(
  visibleElements.reduce((acc, value) => {
    return new Set([...acc, ...value]);
  })
);

const animationOptions = {...defaultAnimationOptions, duration: 2000};

const regularFontSize = '12pt';
const largeFontSize = '2em';

function toggleElementVisibility(animationIndex) {
  const invisibleElements = allVisibleElements.filter(e => !visibleElements[animationIndex].includes(e));
  toggleVisibility(visibleElements[animationIndex], invisibleElements, 'invisible', regularFontSize, {...animationOptions, composite: 'replace'});
}

/**
 * Sparse mapping of animation index to which elements should be enlarged for that animation.
 */
const growingElementIds = ['p8', 'p9', 'p10', 'p11', 'p17', 'p18', 'p19', 'p20', 'p21', 'p22'];
const enlargedElements = {
  4: growingElementIds,
  5: growingElementIds,
  6: growingElementIds,
};
const allEnlargedElements = Object.values(enlargedElements).flat();

function enlargeElementFont(animationIndex) {
  if (animationIndex in enlargedElements) {
    for (const el of enlargedElements[animationIndex]) {
      const element = document.getElementById(el);
      element.animate({ fontSize: [largeFontSize] }, animationOptions);
    }
  } else {
    for (const el of allEnlargedElements) {
      if (!(visibleElements[animationIndex].includes(el))) {
        /* don't animate invisible elements to avoid conflicting
         * with their disappearing animation of font-size
         */
        continue;
      }

      const element = document.getElementById(el);
      element.animate({ fontSize: [regularFontSize] }, animationOptions);
    }
  }
}

function familyTreeAnimationFactory(animationIndex) {
  toggleElementVisibility(animationIndex);
  enlargeElementFont(animationIndex);

  const result = {};
  for (const keyframes of allTransformKeyframes[animationIndex]) {
    for (const el of keyframes.elements) {
      if (!(el in result)) {
        result[el] = { animationOptions, keyframes: { transform: [''] } };
      }

      result[el].keyframes.transform[0] += ` ${keyframes.transform}`;
    }
  }

  const elementsWithTransform = new Set(Object.keys(result));
  const elementsWithoutTransform = allElementIds.filter(el => !elementsWithTransform.has(el));
  for (const el of elementsWithoutTransform) {
    result[el] = { animationOptions, keyframes: identityTransform };
  }

  return result;
}

const familyTreeNumAnimations = allTransformKeyframes.length - 1;
export {
  familyTreeContent,
  familyTreeAnimationFactory,
  familyTreeNumAnimations,
}
