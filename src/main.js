import './assets/main.css'

import {polyfill} from 'mobile-drag-drop'
import { createApp } from 'vue'
import { VueFire, VueFireAuth } from 'vuefire'
import App from './App.vue'
import { firebaseApp } from './firebase'

polyfill({
  holdToDrag: 200 // ms
})

const app = createApp(App)
app
  .use(VueFire, {
    firebaseApp,
    modules: [
      VueFireAuth(),
    ],
  })
  .directive('focus', {
    mounted: (el) => el.focus()
  })
  .mount('#app')
