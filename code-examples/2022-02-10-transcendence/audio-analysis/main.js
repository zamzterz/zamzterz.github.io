const audioUpload = document.getElementById('audioUpload');
const loadingSpinner = document.getElementById('loadingSpinner');
const context = new window.AudioContext();

let numInProgress = 0;

audioUpload.addEventListener('change', async () => {
    const files = Array.from(audioUpload.files);

    for (const file of files) {
        loadingSpinner.style.visibility = 'visible';
        const audioData = await file.arrayBuffer();
        const audioBuffer = await context.decodeAudioData(audioData);
        numInProgress += 1;
        frequencyDetector.postMessage({ name: file.name, audioData: audioBuffer.getChannelData(0) });
    }
});

// create Web worker to offload the expensive frequency computations
const frequencyDetector = new Worker('frequencyDetector.js');
frequencyDetector.onmessage = (e) => {
    numInProgress -= 1;
    if (numInProgress === 0) {
        loadingSpinner.style.visibility = 'hidden';
    }
    console.log(`Analyzed: ${e.data.name}: ${JSON.stringify(e.data.result)}`);
}