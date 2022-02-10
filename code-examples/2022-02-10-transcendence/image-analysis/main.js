
const imageUpload = document.getElementById('imageUpload');
const canvasHolder = document.getElementById('canvasHolder');
const loadingSpinner = document.getElementById('loadingSpinner');

async function setup() {
    const modelsDir = 'models';
    await Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri(modelsDir),
        faceapi.nets.faceRecognitionNet.loadFromUri(modelsDir),
        faceapi.nets.faceLandmark68Net.loadFromUri(modelsDir),
        faceapi.nets.ageGenderNet.loadFromUri(modelsDir),
    ]);

    imageUpload.addEventListener('change', async (e) => {
        // clear any previous results
        while (canvasHolder.firstChild) {
            canvasHolder.firstChild.remove()
        }

        const files = Array.from(imageUpload.files);
        loadingSpinner.style.visibility = 'visible';

        for (const file of files) {
            const image = await faceapi.bufferToImage(file);
            const detectionResult = await faceapi.detectSingleFace(image).withFaceLandmarks().withAgeAndGender().withFaceDescriptor();

            if (!detectionResult) {
                console.log(`Could not detect face: ${file.name}`);
                continue;
            }

            const resultSummary = {
                age: detectionResult.age.toFixed(2),
                gender: detectionResult.gender,
                genderProbability: detectionResult.genderProbability.toFixed(2),
            }
            presentResult(detectionResult, image.height / image.width, file.name);
            console.log(`Analyzed ${file.name}: ${JSON.stringify(resultSummary)}`);
        }
        loadingSpinner.style.visibility = 'hidden';
    });
}

function presentResult(result, aspectRatio, title) {
    const width = 200;
    const height = aspectRatio * width;
    const displaySize = { width, height };
    const canvas = faceapi.createCanvas(displaySize);

    const resizedResults = faceapi.resizeResults([result], displaySize);
    faceapi.draw.drawDetections(canvas, resizedResults);
    faceapi.draw.drawFaceLandmarks(canvas, resizedResults);

    const titleTextOptions = {
        anchorPoint: 'TOP_LEFT',
        backgroundColor: 'white',
        fontColor: 'black',

    };
    new faceapi.draw.DrawTextField([title], {x: 0, y: 0},  titleTextOptions).draw(canvas);

    canvasHolder.append(canvas);
}

setup();
