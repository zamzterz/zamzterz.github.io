---
author: Samuel Gulliksson
title: "Moving poetry: Behind the scenes"
---

The ["Moving poetry" project]({% link art/_posts/2021-11-10-moving-poetry-skogsvandring.md %}) (Swedish only) was an exploration of text and technology.
This post describes some of the nifty Javascript (and CSS) tricks used to build it.

## Web Animations API

The entire project revolves around the "new"
[Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API),
available in modern browsers.
As the name suggests, the API makes it possible to animate DOM elements.
All properties of an element which can be animated are listed
[here](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties).

Animations are defined as a
[`KeyframeEffect`](https://developer.mozilla.org/en-US/docs/Web/API/KeyframeEffect/KeyframeEffect),
which consists of two parts: the
[keyframes](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Keyframe_Formats)
describing the transitions of the animation,
and the options controlling the animations behavior.

Below some examples are shown of what effects can be achieved when animating text elements
(all but the font size animation can of course be applied to any type of element).

### Opacity

To make an element fade in and/or out, the opacity can be animated.
<iframe src="/code-examples/index.html?url=/code-examples/2021-12-01-moving-poetry/opacity/basic" loading="lazy" width="100%" height="250"></iframe>

Notice the difference when pressing the cancel or finish button:
[cancelling an animation](https://developer.mozilla.org/en-US/docs/Web/API/Animation/cancel)
will remove any applied effects (returning the element to its starting state)
while
[finishing an animation](https://developer.mozilla.org/en-US/docs/Web/API/Animation/finish)
will set the current playback time to the end of the animation, which combined with the animation option `fill: 'forwards'` puts the element in its final animated state.

**Safari bug:** When animating the opacity it seems Safari does some strange things.
In below example (Safari only, reproducible at least in version `14.1.2`, even though it seems like an
[old issue](https://stackoverflow.com/a/10935121))
the top two lines fade out even though only the first line has its opacity animated.
The third line only stays visible since it has `opacity: 1` applied by CSS.
<iframe src="/code-examples/index.html?url=/code-examples/2021-12-01-moving-poetry/opacity/safari-fix" loading="lazy" width="100%" height="250"></iframe>


### Font size

By animating the font size, text can be made to smoothly disappear or appear:
<iframe src="/code-examples/index.html?url=/code-examples/2021-12-01-moving-poetry/fontsize/basic" loading="lazy" width="100%" height="250"></iframe>

A small problem, illustrated by the red border in above example, is that the element itself is still rendered.
This can be fixed by using
[`Animation.onfinish`](https://developer.mozilla.org/en-US/docs/Web/API/Animation/onfinish)
to apply a CSS class hiding the element.
<iframe src="/code-examples/index.html?url=/code-examples/2021-12-01-moving-poetry/fontsize/improved" loading="lazy" width="100%" height="250"></iframe>


### Translation

The movement of elements can also be animated.
<iframe src="/code-examples/index.html?url=/code-examples/2021-12-01-moving-poetry/translation/basic" loading="lazy" width="100%" height="250"></iframe>

Using the `cubic-bezier` function to control the timing of the animation
allows some really cool patterns to emerge while still using the same simple keyframes.
[CSS-Tricks](https://css-tricks.com/advanced-css-animation-using-cubic-bezier/)
has further examples with explanations.
To experiment with finding the perfect curve you can use [cubic-bezier.com](https://cubic-bezier.com).

When there is a single keyframe specified, the browser will interpret it as the end state and
[try to infer the starting state](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Keyframe_Formats#implicit_tofrom_keyframes).
Hence, when chaining animations with more than one keyframe it's necessary to make sure they are still starting from their current state.
This can be done using
[`getComputedStyle`](https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle) to get the current transform of the element.
Otherwise the result will look very jumpy, as can be seen in the below example: the "Relative" text element moves along a smooth square (split into two separate animations),
while the "Basic" text elements jumps between positions.
<iframe src="/code-examples/index.html?url=/code-examples/2021-12-01-moving-poetry/translation/relative-chaining" loading="lazy" width="100%" height="250"></iframe>

### Rotation

Similarly, the rotation of elements can be animated.
By moving the
[`transform-origin`](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin),
the element can be rotated around different points.
<iframe src="/code-examples/index.html?url=/code-examples/2021-12-01-moving-poetry/rotation/basic" loading="lazy" width="100%" height="250"></iframe>

By combining animations more complex effects can be achieved.
In the following example an element containing a child element is rotated,
before the child element itself is transformed.
<iframe src="/code-examples/index.html?url=/code-examples/2021-12-01-moving-poetry/rotation/complex" loading="lazy" width="100%" height="250"></iframe>


## Responsiveness

To make sure animations are responsive, and working nicely on smaller screens as well, there are some tricks that can help:
* Use relative length units for all the things, including animated translations. Especially if you're using
  [fluid typography](https://css-tricks.com/snippets/css/fluid-typography/) the text animations will scale nicely.
* CSS functions and variables can be used when specifying the animation keyframes. It's totally legal to specify something like
  ```js
  { transform: ['translateX(calc(var(--font-size) * 5))'] }
  ```
* If you really need to customize the animations based on for example screen size,
  [media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries) can be used in Javascript via
  [matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia).
