const fading = { opacity: [1, 0.3, 0.3, 0.3, 1] };

function withFading(keyframe) {
  return {...fading, ...keyframe };
}

function withFullOpacity(keyframe) {
  return {opacity: [1], ...keyframe };
}

function animate(element, keyframes, currentAnimation, animationOptions) {
  // inspired by: https://simplabs.com/blog/2021/01/29/web-animations-intro/
  if (currentAnimation) {
    currentAnimation.pause();
  }

  // make transform start from current transform
  const currentTransform = getComputedStyle(element).transform;
  const finalKeyframes = {...keyframes};
  if (currentTransform && currentTransform !== 'none' && keyframes.transform) {
    // set current transform as starting state
    finalKeyframes.transform = [currentTransform, ...keyframes.transform];
  }

  const finalAnimationOptions = {...animationOptions};
  return element.animate(finalKeyframes, finalAnimationOptions);
}


function animateAll(animationData, currentAnimations) {
  const animations = {};
  for (const [el, elementAnimationData] of Object.entries(animationData)) {
    if (!elementAnimationData) {
      continue;
    }

    const element = document.getElementById(el);
    const {
      keyframes: elementKeyframes = elementAnimationData,
      animationOptions = defaultAnimationOptions
    } = elementAnimationData;
    animations[el] = animate(element, elementKeyframes, currentAnimations[el], animationOptions);
  }

  return animations;
}

function toggleVisibility(visibleElements, invisibleElements, invisibilityClassName, fontSize, animationOptions) {
  function makeVisible(el) {
    const element = document.getElementById(el);
    if (!element.classList.contains(invisibilityClassName)) {
      return null;
    }

    element.classList.remove(invisibilityClassName);
    return element.animate({ fontSize: ['0', fontSize] }, animationOptions);
  }

  function makeInvisible(el) {
    const element = document.getElementById(el);
    if (element.classList.contains(invisibilityClassName)) {
      return null;
    }

    const animation = element.animate({ fontSize: [ fontSize, '0'] }, animationOptions)
    animation.onfinish = () => {
      element.classList.add(invisibilityClassName);
    };
    return animation;
  }

  function zip(a, b) {
    return a.map((v, i) => [v, b[i]]).filter(([_, v]) => v !== null);
  }

  const visibleElementsAnimations = visibleElements.map(makeVisible);
  const invisibleElementsAnimations = invisibleElements.map(makeInvisible);
  return {
    ...Object.fromEntries(zip(visibleElements, visibleElementsAnimations)),
    ...Object.fromEntries(zip(invisibleElements, invisibleElementsAnimations))
  };
}

function reorderElementsKeyframes(elementOrigin, order, isFirstOrdering, maxYOffset, deltaX, animationOptionsOverride = {}) {
  const generateRandomYOffset = () => getRandomInt(-maxYOffset, maxYOffset);

  const animationOptions = {
    ...defaultAnimationOptions,
    easing: 'cubic-bezier(0.5, 0, 0, 1.5)',
    ...animationOptionsOverride
  };
  if (isFirstOrdering) {
    return Object.fromEntries(order.map(el => {
      return [el, {
        keyframes: { transform: [
          `translateY(${generateRandomYOffset()}px)`,
          identityTransform.transform[0] // make sure element ends up at starting point
        ]},
        animationOptions,
      }];
    }));
  }

  const result = {};
  for (let i = 0; i < order.length; i++) {
    const el = order[i];
    const element = document.getElementById(el);

    const newX = elementOrigin.x + deltaX * i;
    const currentX = element.getBoundingClientRect().x;
    const xDiff = newX - currentX;

    const transform = [
      getComputedStyle(element).transform,
      `translateX(${xDiff/2}px) translateY(${generateRandomYOffset()}px)`,
      `translateX(${xDiff}px) translateY(0px)`
    ];
    result[el] = { keyframes: { transform }, animationOptions};
  }

  return result;
}

function waitForAllAnimations(animations) {
  return Promise.all(Object.values(animations).map((a) => a.finished));
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const defaultAnimationOptions = {
  duration: 3000,
  fill: 'forwards',
  easing: 'ease-in-out',
}

const identityTransform = { transform: ['translateX(0) translateY(0)'] };

export {
  animate,
  animateAll,
  withFading,
  withFullOpacity,
  toggleVisibility,
  reorderElementsKeyframes,
  waitForAllAnimations,
  defaultAnimationOptions,
  identityTransform,
}
