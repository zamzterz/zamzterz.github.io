---
author: Samuel Gulliksson
title: Creating an Audio Player Component
---

One element of
"[Transcendence: A Visionary Truth]({% link art/_posts/2022-02-01-transcendence.md %})"
is an audio clip (generated via speech synthesis).
To make it look nicer than the
[default controls](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio)
of each browser I created a very basic audio player with just a few lines of Javascript.

The requirements were very basic:
* it should be possible to pause and play the audio, and
* it should show the progress of the audio.

No need for volume controls or a fancy seek slider
(not only due to laziness, but actually part of the listening experience – it shouldn't be possible to skip around in the audio).

While figuring out how to do it I stumbled upon the excellent CSS-Tricks article
["Let’s Create a Custom Audio Player"](https://css-tricks.com/lets-create-a-custom-audio-player/).
Not only did it show how to create a custom audio player,
it also mentioned packaging it all up as a web component...
What a dream, reusable components finally becoming
[a thing](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
for frontend development!

Using the custom audio player is as simple as the following (but not really, see [below](#caveats)):
```js
<audio-player src="..."></audio-player>
```

and it looks like this:

<audio-player src="https://www.soundboard.com/mediafiles/mz/Mzg1ODMxNTIzMzg1ODM3_JzthsfvUY24.MP3"></audio-player>

The code can be found [here]({% link art/transcendence/lib/audio-player/audio-player.js %}).

Some interesting features:
* The progress/duration text will have the same color as surrounding text since
  [shadow DOM inherits styles](https://open-wc.org/guides/knowledge/styling/styles-piercing-shadow-dom/#styling-styles-piercing-shadow-dom) (which includes `color`).
* The color of the play/pause button can be styled separately via
  [`::part`](https://developer.mozilla.org/en-US/docs/Web/CSS/::part) pseudo-element:
  ```css
  audio-player::part(playbutton) {
    color: black;
  }
  ```

## Caveats
The play button uses symbols defined in a custom font.
To make that work, the host page must include a `font-face` definition in its styling
(browser support for shadow trees containing `@font-face` is [very limited](https://wiki.csswg.org/spec/css-scoping)):
```css
@font-face {
    font-family: 'fontello';
    src: url('fontello.woff2') format('woff2'),
         url('fontello.woff')
}
```


<style>
@font-face {
    font-family: 'fontello';
    src: url('{% link art/transcendence/lib/icons/font/fontello.woff2 %}?48840635 %}') format('woff2'),
         url('{% link art/transcendence/lib/icons/font/fontello.woff %}?48840635 %}')
}

audio-player::part(playbutton) {
  color: black;
}
</style>

<script type="module" src="{% link art/transcendence/lib/audio-player/audio-player.js %}"></script>
