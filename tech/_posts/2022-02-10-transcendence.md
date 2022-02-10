---
author: Samuel Gulliksson
title: "Transcendence: Behind the scenes"
---

The ["Transcendence" project]({% link art/_posts/2022-02-01-transcendence.md %})
was an exploration of applying technology to personal data in the form of face portrait images and recorded voice samples.
This post describes some of the tech used to build it.

## Data analysis
The two different data sets — 1 set of images, 1 set of audio recordings — was processed using two libraries:
[`face-api.js`](https://github.com/justadudewhohacks/face-api.js/) and [`pitchfinder`](https://github.com/peterkhayes/pitchfinder) respectively.

Turns out both operations could take noticeable time to complete (on the order of tens of seconds), given large enough input sizes.
In Chrome and Firefox this was not noticeable, but in Safari (as usual...) the UI would freeze and the pretty spinning loader would not actually be shown.
(Presumably because it [doesn't repaint while being busy](https://stackoverflow.com/a/66165276) with the long running task?)

To get around this I turned to [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API),
trying to shift all that heavy computing out of the main thread.
Everything was a smooth ride for the audio processing.
Not so much for the face detection —
getting `face-api.js` to work in a Web Worker seemed to be an impossible task (or at least too time consuming for this simple proof-of-concept)
despite [claims of working examples](https://github.com/justadudewhohacks/face-api.js/issues/47).
However, the basic (blocking) implementation is shown below.

Supporting multi upload, a set of images can be analysed to detect any contained face and extract information about the identified features of the face (face landmarks), estimated age and gender:

<iframe src="/code-examples/index.html?url=/code-examples/2022-02-10-transcendence/image-analysis&tab=js" loading="lazy" width="100%" height="350"></iframe>

Similarly, a pitch detection algorithm was applied to the audio recordings, which samples the audio data and returns the detected frequencies:

<iframe src="/code-examples/index.html?url=/code-examples/2022-02-10-transcendence/audio-analysis&tab=js" loading="lazy" width="100%" height="250"></iframe>

[Web Worker code](/code-examples/2022-02-10-transcendence/audio-analysis/frequencyDetector.js)

***Note:** The results are printed in the Javascript console.*

## Data visualization

The extracted data was visualized using [`Chart.js`](https://www.chartjs.org/).
Some of the noteworthy features utilized:
* Using a [gradient as line color]((https://www.chartjs.org/docs/3.7.0/samples/advanced/linear-gradient.html)) (used for visualizing the binary gender classifications).
* The [annotation plugin](https://www.chartjs.org/chartjs-plugin-annotation/latest/) for drawing horizontal lines and boxes (used for example to show the average male and female voice ranges).
* The [boxplot plugin](https://github.com/sgratzl/chartjs-chart-boxplot) for showing the five-number summary for a set of values (used for visualizing the voice frequency data).

## Text-to-speech

The poem
["This is not my voice"](/art/transcendence/data/not_my_voice.mp3)
was rendered using [Azure Text to Speech](https://azure.microsoft.com/en-us/services/cognitive-services/text-to-speech/#overview).

It has a nice variety of voices and offers a [graphical web interface](https://speech.microsoft.com/audiocontentcreation)
for editing the audio content (while also supporting raw [SSML](https://en.wikipedia.org/wiki/Speech_Synthesis_Markup_Language)).
