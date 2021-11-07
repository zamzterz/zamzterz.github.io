<template>
    <div class="splash-screen" :style="customStyle">
        <div class="splash-screen-text" :style="customStyle">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    animationDuration: {
      type: Number,
      required: true,
    }
  },

  data() {
    return {
      customStyle: { '--splash-screen-duration': `${this.animationDuration}s` }
    }
  },
};
</script>

<style scoped>
:root {
    --splash-screen-duration: 3s;
}

.splash-screen {
    color: white;
    background-color: black;
    position: fixed;
    width: 100vw;
    height: 100vh;
    animation: splash-screen var(--splash-screen-duration) forwards;
    z-index: 1;
    pointer-events: none
}

.splash-screen-text {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    animation: splash-screen-text var(--splash-screen-duration) forwards;
}

@keyframes splash-screen {
    60% { background-color: rgba(0, 0, 0, 1);  }
    100% { background-color: rgba(0, 0, 0, 0.0); }
}

@keyframes splash-screen-text {
    60% {
         font-size: 100%;
         transform: translate(0, 0);
    }
    80% {
        font-size: 75%;
        transform: translate(0, 0);
        color: white;
    }
    100% {
        font-size: 75%;
        color: rgb(70, 70, 70);
        transform: translate(calc(-50vw + 100px), calc(-50vh + 40px));
    }
}
</style>
