// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPtjaZi_31ZYeLVdwVmNUddapf3GfWgQI",
  authDomain: "crm-app-9e0be.firebaseapp.com",
  projectId: "crm-app-9e0be",
  storageBucket: "crm-app-9e0be.appspot.com",
  messagingSenderId: "360633351322",
  appId: "1:360633351322:web:8e2526490b6d8f2cee3323",
  measurementId: "G-2PCYP2F4KH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
