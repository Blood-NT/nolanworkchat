import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBhRZBNvzZ52tI_tgFIFkPoXiOPkyiHH4g",
  authDomain: "nolanwork-128ad.firebaseapp.com",
  projectId: "nolanwork-128ad",
  storageBucket: "nolanwork-128ad.appspot.com",
  messagingSenderId: "708741152303",
  appId: "1:708741152303:web:eb020d3e5202253cbd10da",
  measurementId: "G-3D7Q197MX1"
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage, app };