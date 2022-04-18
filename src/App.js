import './App.css';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDG2fLLEjnjdKsDsPTSVRiruK_FyisIcJ8",
  authDomain: "drew-daniels-wheres-waldo.firebaseapp.com",
  projectId: "drew-daniels-wheres-waldo",
  storageBucket: "drew-daniels-wheres-waldo.appspot.com",
  messagingSenderId: "455264246838",
  appId: "1:455264246838:web:f027b4bcd76e2e7d448c97"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function App() {
  return (
    <div className="App">

    </div>
  );
}

export default App;
