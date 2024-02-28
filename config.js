import {initializeApp} from 'firebase/app'
import {getDatabase} from 'firebase/database'


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCx2zZUVgfgtiof62uJRxRMe_JRyjWc-BY",
    authDomain: "posting-7f115.firebaseapp.com",
    projectId: "posting-7f115",
    storageBucket: "posting-7f115.appspot.com",
    messagingSenderId: "786001349217",
    appId: "1:786001349217:web:9521d63ee39b45aa75f820"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const db = getDatabase(app)

export default db