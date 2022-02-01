import { chartJSgradient } from './lib/gradient.js';

const blueColor = '#55cdfc';
const pinkColor = '#f7a8b8';
const bluePinkMix = '#a6bbda';

start();

async function start() {
    const response = await fetch('data/face.json');
    const results = await response.json();

    const labels = [];
    const genderData = [];
    const genderProbabilityData = [];
    for (const [label, result] of Object.entries(results)) {
        labels.push(label);
        genderData.push(result.gender === 'male' ? 1 : 0);
        genderProbabilityData.push(result.genderProbability);
    }

    Chart.defaults.color = '#fff';
    Chart.defaults.maintainAspectRatio = false;

    drawGenderDiagram(labels, genderData);
    drawGenderProbabilityDiagram(labels, genderProbabilityData, genderData);
    drawVoiceDiagram();
    drawGenderFluidDiagram();
}

function drawGenderDiagram(labels, data) {
    const averageGender = data.reduce((a, b) => a + b) / data.length;
    const genderMovingAverage = cumulativeSum(data).map((v, i) => v / (i + 1));

    const genderChartCtx = document.getElementById('genderChart').getContext('2d');
    const verticalGenderGradient = chartJSgradient('vertical', pinkColor, blueColor);
    const horizontalGenderGradient = chartJSgradient('horizontal', pinkColor, blueColor);
    const genderChartData = {
        labels,
        datasets: [
            {
                label: 'Binary gender',
                data,
                stepped: true,
                borderColor: verticalGenderGradient,
                backgroundColor: verticalGenderGradient,
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';

                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += context.parsed.y === 1 ? 'male' : 'female';
                            }
                            return label;
                        }
                    }
                }
            },
            {
                label: 'Average gender',
                data: genderMovingAverage,
                pointRadius: 2,
                borderColor: horizontalGenderGradient,
                backgroundColor: horizontalGenderGradient,
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';

                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += `${Math.round(context.parsed.y * 100)}% male`;
                            }
                            return label;
                        }
                    }
                }
            },
        ],
    };
    new Chart(genderChartCtx, {
        type: 'line',
        data: genderChartData,
        options: {
            plugins: {
                annotation: {
                    annotations: {
                        averageLabel: {
                            type: 'label',
                            yValue: averageGender,
                            xValue: data.length,
                            xAdjust: -40,
                            backgroundColor: 'rgb(0, 0, 0)',
                            color: 'rgb(255, 255, 255)',
                            borderRadius: 5,
                            content: [`${Math.round(averageGender * 100)}% male`],
                          }
                    }
                },
            },
            scales: {
                y: {
                    ticks: {
                        callback: (value, index, values) => {
                            if (index === 0) {
                                return 'female'
                            } else if (index === values.length - 1) {
                                return 'male'
                            }
                            return '';
                        },
                    },
                },
            }
        }
    });
}

function drawGenderProbabilityDiagram(labels, probabilityData, genderData) {
    const genderProbabilityCtx = document.getElementById('genderProbabilityChart').getContext('2d');

    const colors = genderData.map((g) => g === 1 ? blueColor : pinkColor);

    const genderProbabilityChartData = {
        labels,
        datasets: [{
            data: probabilityData,
            pointBackgroundColor: colors,
            borderColor: bluePinkMix,
            backgroundColor: bluePinkMix,
        }]
    };
    new Chart(genderProbabilityCtx, {
        type: 'line',
        data: genderProbabilityChartData,
        options: {
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Gender probability'
                    },
                }
            },
            plugins: {
                legend: {
                    display: false,
                },
                annotation: {
                    annotations: {
                      average: {
                        type: 'line',
                        yMin: 0,
                        yMax: 0,
                        borderColor: 'rgb(0, 0, 0)',
                        borderWidth: 1,
                      }
                    }
                },
            },
        }
    });
}

async function drawVoiceDiagram() {
    const response = await fetch('data/voice.json');
    const results = await response.json();

    const labels = [];
    const values = [];
    for (const [label, frequencies] of Object.entries(results)) {
        labels.push(label);
        values.push(frequencies.map(parseFloat));
    }

    const data = {
        labels,
        datasets: [{
            label: 'Voice range',
            backgroundColor: 'rgba(255,255,255, 1.0)',
            data: values,
        }]
    };

    const rangeAnnotationAlpha = 0.5;
    const voiceCtx = document.getElementById('voiceChart').getContext('2d');
    new Chart(voiceCtx, {
        type: 'boxplot',
        data,
        options: {
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Voice frequency (Hz)'
                    },
                }
            },
            plugins: {
                legend: {
                    display: false,
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const lines = context.formattedValue.toString().slice(1, -1).split(', ');
                            return lines;
                        }
                    }
                },
                annotation: {
                    annotations: {
                        maleVoiceRange: {
                            type: 'box',
                            drawTime: 'beforeDraw',
                            yMin: 85,
                            yMax: 155,
                            backgroundColor: withOpacity(blueColor, rangeAnnotationAlpha),
                        },
                        femaleVoiceRange: {
                            type: 'box',
                            drawTime: 'beforeDraw',
                            yMin: 165,
                            yMax: 255,
                            backgroundColor: withOpacity(pinkColor, rangeAnnotationAlpha)
                        }
                    }
                },
            }
        }
    });
}

function drawGenderFluidDiagram() {
    const genderFluidChartCtx = document.getElementById('genderFluidChart').getContext('2d');

    const colorAlpha = 0.5;
    const transparentBlue = withOpacity(blueColor, colorAlpha);
    const transparentPink = withOpacity(pinkColor, colorAlpha);
    const verticalGenderGradient = chartJSgradient('vertical', transparentPink, transparentBlue, transparentBlue);
    const minYValue = 0.5;
    const maxYValue = 0.9;
    const data = Array.from({length: 5}, () => random(minYValue, maxYValue));
    const millisecondsBetweenUpdates = 3000;
    const labels = [...data.keys()];
    const genderFluidChartData = {
        labels,
        datasets: [
            {
                label: 'Gender fluidity',
                fill: 'origin',
                data,
                borderWidth: 0,
                backgroundColor: verticalGenderGradient,
                radius: 0,
                tension: 0.4
            },
        ],
    };
    const chart = new Chart(genderFluidChartCtx, {
        type: 'line',
        data: genderFluidChartData,
        options: {
            plugins: {
                legend: {
                    display: false,
                },
                tooltip: {
                    enabled: false,
                },
            },
            animations: {
                tension: {
                    duration: 500,
                    easing: 'easeInOut',
                    from: 0.7,
                    to: 0.2,
                    loop: true
                },
                y: {
                    duration: millisecondsBetweenUpdates,
                    easing: 'easeInOut',
                },
            },
            scales: {
                y: {
                    ticks: {
                        display: false,
                    },
                    grid: {
                        display: false,
                        drawBorder: false,
                        tickLength: 0,
                    },
                    min: 0,
                    max: 1,
                },
                x: {
                    ticks: {
                        display: false,
                    },
                    grid: {
                        display: false,
                        drawBorder: false,
                    },
                },
            }
        }
    });

    let previousTime = 0;
    const updateChart = (time) => {
        requestAnimationFrame(updateChart);
        if (time - previousTime < millisecondsBetweenUpdates) {
            return;
        }
        previousTime = time;
        chart.data.datasets[0].data = Array.from({length: chart.data.datasets[0].data.length}, () => random(minYValue, maxYValue));
        chart.update();
    };

    requestAnimationFrame(() => {
        updateChart();
    });
}

function cumulativeSum(values) {
    const result = [];
    let total = 0;
    for (const [i, val] of values.entries()) {
        total += val;
        result[i] = total;
    }

    return result;
}

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function withOpacity(colorHex, alpha) {
    return `${colorHex}${Math.floor(alpha * 255).toString(16).padStart(2, 0)}`;
}
