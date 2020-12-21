import { createApp } from 'vue';
// import VueSignaturePad from 'vue-signature-pad'
// import VueSignature from 'vue-signature'
import App from './App.vue';
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
// import cors from 'cors'; 

const app = createApp(App)
const options = {
  // You can set your default options here
};

app.use(Toast, options);
// app.use(VueSignaturePad)
// app.use(VueSignature)
// app.use(DKToast);
// app.use(cors)
app.mount('#app');
