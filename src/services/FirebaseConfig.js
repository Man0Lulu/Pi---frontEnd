import { initializeApp } from "firebase/app";

export const urlApi = "https://back-front-pi-default-rtdb.firebaseio.com/"

const firebaseConfig = {
  apiKey: "AIzaSyA3mY2K-AMs8OtLoHS6t9X-Dcon41leEDI",
  authDomain: "back-front-pi.firebaseapp.com",
  databaseURL: "https://back-front-pi-default-rtdb.firebaseio.com",
  projectId: "back-front-pi",
  storageBucket: "back-front-pi.appspot.com",
  messagingSenderId: "163802549132",
  appId: "1:163802549132:web:8096873e6899335d9664a9",
  measurementId: "G-GG9DFKBX3R"
};

export const app = initializeApp(firebaseConfig)