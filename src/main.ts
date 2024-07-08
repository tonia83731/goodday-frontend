import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// vue-select
import VueMultiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.css'

// fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
library.add(fas, far)

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('v-multi-select', VueMultiselect)
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
