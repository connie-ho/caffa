
  import firebase from 'firebase/app';
  import 'firebase/storage';
  import 'firebase/firestore';

  //Web app config
  var firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "project-test-123-84049.firebaseapp.com",
    projectId: "project-test-123-84049",
    storageBucket: "project-test-123-84049.appspot.com",
    messagingSenderId: "224670135033",
    appId: "1:224670135033:web:d466d7377803e19abb2828"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const projectStorage = firebase.storage();
  const projectFirestore = firebase.firestore();

  export { projectStorage, projectFirestore }