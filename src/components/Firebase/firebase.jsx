import { initializeApp } from "firebase/app";
// import {getAuth} from "firebase/auth"

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_FIRBASE_API_KEY,
  authDomain: import.meta.env.VITE_REACT_APP_FIRBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_REACT_APP_FIRBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_REACT_APP_FIRBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_REACT_APP_FIRBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_REACT_APP_FIRBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
export default app;