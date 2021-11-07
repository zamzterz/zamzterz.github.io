<template>
    <splash-screen :animationDuration="splashScreenDurationSeconds">
        <h1>Moving poetry:</h1>
        <h2>Skogsvandring</h2>
    </splash-screen>

    <background-forest v-if="!isLoading">
        <div class="container">
            <button id="previous" @click="previous()" :disabled="currentPoemIndex <= 0">
            <div class="prev-arrow-wrapper">
                <i class="arrow left" :style="navigationArrowCustomStyle"></i>
            </div>
            </button>

            <the-poem :key="currentPoem.key" :content="currentPoem.content" :setup="currentPoem.setup" :destroy="currentPoem.destroy" :animationFactory="currentPoem.animationFactory" :numAnimations="currentPoem.numAnimations"></the-poem>

            <button id="next" @click="next()" :disabled="currentPoemIndex >= allPoems.length - 1">
            <div class="next-arrow-wrapper">
                <i class="arrow right" :style="navigationArrowCustomStyle"></i>
            </div>
            </button>
        </div>
    </background-forest>
</template>

<script>
import { whenWeFallContent, whenWeFallSetup, whenWeFallAnimationFactory, whenWeFallNumAnimations } from './poems/whenWeFall.js'
import { familyTreeContent, familyTreeAnimationFactory, familyTreeNumAnimations } from './poems/familyTree.js'
import { barbarianContent, barbarianSetup, barbarianAnimationFactory, barbarianNumAnimations } from './poems/barbarian.js'
import { breatheContent, breatheSetup, breatheDestroy, breatheAnimationFactory, breatheNumAnimations } from './poems/breathe.js'
import { windPowerContent, windPowerSetup, windPowerDestroy, windPowerAnimationFactory, windPowerNumAnimations } from './poems/windPower.js'
import { fallingTreesContent, fallingTreesAnimationFactory, fallingTreesNumAnimations } from './poems/fallingTrees.js'
import { vampiresContent, vampiresSetup, vampiresDestroy, vampiresAnimationFactory, vampiresNumAnimations } from './poems/vampires.js'

const allPoems = [
  { key: 'breathe', content: breatheContent, setup: breatheSetup, destroy: breatheDestroy, animationFactory: breatheAnimationFactory, numAnimations: breatheNumAnimations },
  { key: 'family_tree', content: familyTreeContent, animationFactory: familyTreeAnimationFactory, numAnimations: familyTreeNumAnimations },
  { key: 'when_we_fall', content: whenWeFallContent, setup: whenWeFallSetup, animationFactory: whenWeFallAnimationFactory, numAnimations: whenWeFallNumAnimations },
  { key: 'barbarian', content: barbarianContent, setup: barbarianSetup, animationFactory: barbarianAnimationFactory, numAnimations: barbarianNumAnimations },
  { key: 'wind_power', content: windPowerContent, setup: windPowerSetup, destroy: windPowerDestroy, animationFactory: windPowerAnimationFactory, numAnimations: windPowerNumAnimations },
  { key: 'falling_trees', content: fallingTreesContent, animationFactory: fallingTreesAnimationFactory, numAnimations: fallingTreesNumAnimations },
  { key: 'vampires', content: vampiresContent, setup: vampiresSetup, destroy: vampiresDestroy, animationFactory: vampiresAnimationFactory, numAnimations: vampiresNumAnimations },
]

const navigationArrowSize = '5vh';
const splashScreenDurationSeconds = 4;

export default {
  data() {
    return {
      currentPoemIndex: 0,
      allPoems,
      isLoading: true,
      navigationArrowCustomStyle: { '--arrow-size': navigationArrowSize },
      splashScreenDurationSeconds
    }
  },

  mounted() {
    setTimeout(() => {
      this.isLoading = false;
    }, splashScreenDurationSeconds * 1000);
  },

  methods: {
    previous() {
      this.currentPoemIndex--;
    },

    next() {
      this.currentPoemIndex++;
    }
  },

  computed: {
    currentPoem() {
      return allPoems[this.currentPoemIndex];
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Merriweather&display=swap');

:root {
    --background-color: rgb(254, 249, 246);
}

body {
    background: var(--background-color);
    font-family: 'Merriweather', serif;
    margin: 0;
}

html, body { height: 100% }

p {
    margin: 0;
    padding: 0;
    line-height: 1em;
    color: rgb(20, 20, 20);
}

button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    outline: none;
}

button:disabled {
    opacity: 0.2;
    cursor: default;
}

#app {
    height: 100%;
}

.arrow {
    border: solid black;
    border-width: 0 3px 1px 0;
    display: inline-block;
    padding: var(--arrow-size, 1.5vh);
}

.arrow.right {
    transform: rotate(-45deg);
}

.arrow.left {
    transform: rotate(135deg);
}
</style>

<style scoped>
.container {
    display: flex;
    height: 100%;
    padding: 0 60px 0 60px;
}

.next-arrow-wrapper {
    border-left: 2px solid black;
}

.prev-arrow-wrapper {
    border-right: 2px solid black;
}

.splash-screen-text h1, .splash-screen-text h2 {
    margin: 0;
}
</style>
