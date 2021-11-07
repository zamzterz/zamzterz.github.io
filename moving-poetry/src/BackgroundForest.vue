<template>
  <div id="background">
    <figure>
      <img class="background-image" src="./assets/forest.jpg?as=webp">
      <figcaption class="background-image-credit">
        Photo by
        <a href="https://unsplash.com/@jaymantri?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Jay Mantri</a>
        on
        <a href="https://unsplash.com/@jaymantri?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
      </figcaption>
    </figure>
    <div id="birds"></div>

    <div class="nested-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
/* global VANTA */
export default {
  mounted() {
    VANTA.BIRDS({
      el: "#birds",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      backgroundAlpha: 0,
      color1: 0x222222,
      color2: 0x0,
      colorMode: "lerpGradient",
      birdSize: 1.20,
      wingSpan: 20.00,
      separation: 80.00,
      alignment: 32.00,
      quantity: 3.00
    });
  },
}
</script>

<style scoped>
#background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: -1;
}

#birds {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.background-image-credit {
  position: absolute;
  bottom: 0;
  left: 0;
  color: white;
  margin: 10px;
}

.background-image-credit > a {
  color: rgb(0, 170, 0);
}

.nested-content {
  z-index: 10;
  bottom: 50px; /* leave room for the background-image-credit */
  height: calc(100% - 50px);
}
</style>
