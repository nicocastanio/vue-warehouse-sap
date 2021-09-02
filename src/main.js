import { createApp } from 'vue';
// import VueSignaturePad from 'vue-signature-pad'
// import VueSignature from 'vue-signature'
import App from './App.vue';
import Toast from "vue-toastification";
import vSelect from 'vue-select';
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
import 'vue-select/dist/vue-select.css';


const app = createApp(App)
const options = {
  // You can set your default options here
};

app.use(Toast, options);
app.use(vSelect);
app.component('v-select', vSelect);
// app.use(VueSignaturePad)
// app.use(VueSignature)
app.mount('#app');
