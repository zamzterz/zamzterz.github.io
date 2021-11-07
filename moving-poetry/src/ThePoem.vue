<template>
    <div class="poem">
        <div id="top-navigation">
            <button id="backward" @click="backward()" :disabled="currentAnimationIndex <= 0">
                <i class="arrow left"></i>
            </button>
            <button id="forward" @click="forward()" :disabled="currentAnimationIndex >= numAnimations">
                <i class="arrow right"></i>
            </button>
        </div>

        <div class="text" v-html="content"></div>
    </div>
</template>

<script>
import { animateAll } from './animateText.js'

export default {
  props: {
    content: {
      type: String,
      required: true,
    },
    animationFactory: {
      type: Function,
      required: true,
    },
    setup: {
      type: Function,
      required: false,
    },
    destroy: {
      type: Function,
      required: false,
    },
    numAnimations: {
      type: Number,
      required: true,
    }
  },

  mounted() {
    if (this.setup) {
      this.setup();
    }
  },

  unmounted() {
    if (this.destroy) {
      this.destroy();
    }
  },

  data() {
    return {
      currentAnimationIndex: 0,
      currentAnimations: {}
    }
  },

  methods: {
    forward() {
      this.currentAnimationIndex++;
      this.animateState();
    },

    backward() {
      this.currentAnimationIndex--;
      this.animateState();
    },

    animateState() {
      const nextAnimationData = this.animationFactory(this.currentAnimationIndex);
      this.currentAnimations = animateAll(nextAnimationData, this.currentAnimations);
    },
  },
}
</script>

<style scoped>
#top-navigation {
    margin-top: 40px;
}

.poem {
    flex-grow: 1;
    margin: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.text {
    margin-top: 60px;
}
</style>
