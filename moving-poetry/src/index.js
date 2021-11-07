import { createApp } from 'vue';
import App from './App.vue'
import BackgroundForest from './BackgroundForest.vue'
import SplashScreen from './SplashScreen.vue'
import ThePoem from './ThePoem.vue'

const app = createApp(App);
app.component('BackgroundForest', BackgroundForest);
app.component('SplashScreen', SplashScreen);
app.component('ThePoem', ThePoem);
app.mount('#app');
