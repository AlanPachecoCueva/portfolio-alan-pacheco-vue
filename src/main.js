import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import dictionary from "./plugins/dictionary";

import { createI18n } from "vue-i18n";
import themeMixin from './plugins/themeMixin.js';

import router from "./router";

//Store pinia
import { createPinia } from 'pinia'

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const i18n = createI18n({
  messages: dictionary,
  locale: "EN",
});

import { Icon } from '@iconify/vue';

createApp(App).use(VueSweetalert2).use(vuetify).use(createPinia()).use(i18n).use(router).component('Icon', Icon).mixin(themeMixin).mount("#app");
