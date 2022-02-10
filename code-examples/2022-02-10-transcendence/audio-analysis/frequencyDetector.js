importScripts('pitchfinder.min.js');

const detector = Pitchfinder.AMDF({maxFrequency: 1000});

onmessage = (e) => {
    const moreAccurateFrequencies = Pitchfinder.frequencies(
        [detector],
        e.data.audioData,
    );
    const result = moreAccurateFrequencies.filter(x => !isNaN(x));
    postMessage({ name: e.data.name, result });
}