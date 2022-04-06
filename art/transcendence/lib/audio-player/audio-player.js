const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host { display: block; }
    :host([hidden]) { display: none }

    #controls {
        display: flex;
        align-items: center;
    }

    #controls > button {
        border: none;
        background: transparent;
        text-decoration: none;
        font-size: 45px;
        cursor: pointer;
    }

    .time-sep {
        margin-left: 3px;
        margin-right: 3px;
    }

    .time-sep::before {
        content: "/";
    }

  </style>
  <link rel="stylesheet" type="text/css" href="/art/transcendence/lib/icons/css/fontello.css">

  <div>
    <audio preload="metadata"></audio>
    <div id="controls">
        <button id="play" part="playbutton"><i class="icon-play"></i></button>
        <span id="currentTime">0:00</span><span class="time-sep"></span><span id="duration"></span>
    </div>
  </div>
`;


class AudioPlayer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'})
            .appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this._setup();
    }

    _setup() {
        const shadow = this.shadowRoot;

        const playBtn = shadow.getElementById('play');
        const audio = shadow.querySelector('audio');
        const durationContainer = shadow.getElementById('duration');
        const currentTimeContainer = shadow.getElementById('currentTime');

        audio.addEventListener('loadedmetadata', () => {
            durationContainer.textContent = this._formatSeconds(audio.duration);
        });
        audio.addEventListener('ended', () => {
            playBtn.children[0].classList.remove('icon-pause');
            playBtn.children[0].classList.add('icon-play');
        });
        audio.src = this.getAttribute('src');

        const updateCurrentTime = () => {
            currentTimeContainer.textContent = this._formatSeconds(audio.currentTime);
        };
        playBtn.addEventListener('click', () => {
            playBtn.children[0].classList.toggle('icon-play');
            playBtn.children[0].classList.toggle('icon-pause');
            if (audio.paused) {
                audio.play();
                this.currentTimeInterval = setInterval(updateCurrentTime, 500);
            } else {
                clearInterval(this.currentTimeInterval);
                audio.pause();
            }
        });
    }

    _formatSeconds(s) {
        const minutes = Math.floor(s / 60);
        const seconds = Math.floor(s % 60);
        const paddedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${minutes}:${paddedSeconds}`;
    }

    disconnectedCallback() {
        if (this.currentTimeInterval) {
            clearInterval(this.currentTimeInterval)
        }
    }
}

customElements.define('audio-player', AudioPlayer);
