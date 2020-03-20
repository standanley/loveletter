import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBEtx5EREtQ2rzyyF3UDSBzA-ECVNBat5o",
  authDomain: "play-love-letter.firebaseapp.com",
  databaseURL: "https://play-love-letter.firebaseio.com",
  projectId: "play-love-letter",
  storageBucket: "play-love-letter.appspot.com",
  messagingSenderId: "609098981651",
  appId: "1:609098981651:web:9a19ef62a5a5412bc27ae6",
  measurementId: "G-LMB2RXRYYT"
};
firebase.initializeApp(firebaseConfig);

export default firebase;
