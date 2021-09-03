importScripts('https://www.gstatic.com/firebasejs/7.16.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.16.1/firebase-messaging.js');
firebase.initializeApp({
  apiKey: "AIzaSyA_z50JMhXcxHhd1fp5hjlXIQw15egSAPQ",
  authDomain: "angular-firebase-rtdb-auth-msg.firebaseapp.com",
  databaseURL: "https://angular-firebase-rtdb-auth-msg-default-rtdb.firebaseio.com",
  projectId: "angular-firebase-rtdb-auth-msg",
  storageBucket: "angular-firebase-rtdb-auth-msg.appspot.com",
  messagingSenderId: "602817944756",
  appId: "1:602817944756:web:992f4952e3795aa0090be1",
  measurementId: "G-X6019M5XT2"
});
const messaging = firebase.messaging();
