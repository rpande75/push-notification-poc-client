import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from "firebase/messaging";

var firebaseConfig = {
  apiKey: "AIzaSyC4JDe9WS5kewbgCep9e_2RyTinBjPoJHw",
  authDomain: "my-firebase-project-dea83.firebaseapp.com",
  projectId: "my-firebase-project-dea83",
  storageBucket: "my-firebase-project-dea83.appspot.com",
  messagingSenderId: "425242182174",
  appId: "1:425242182174:web:a228b483782d608319640f",
  measurementId: "G-RVER4W4HDX"
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const fetchToken = (setTokenFound) => {
  return getToken(messaging, {vapidKey: 'BBJhsyjM3cQWzxfjwMZ6REBS_hdhKhuVzre5AjunSEcPgLtCttCxNKiZCHf_x_zA4y_yb5lWMWmtfLakjN3i1tM'}).then((currentToken) => {
    if (currentToken) {
      console.log('current token for client: ', currentToken);
      setTokenFound(true);
      // Track the token -> client mapping, by sending to backend server
      // show on the UI that permission is secured
    } else {
      console.log('No registration token available. Request permission to generate one.');
      setTokenFound(false);
      // shows on the UI that permission is required 
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // catch error while creating client token
  });
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
});
