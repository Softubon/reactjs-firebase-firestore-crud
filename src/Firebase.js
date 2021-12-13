import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

const config = {
  apiKey: "AIzaSyACF72CqJarBidMVZoep2zHLaSQVkSS0EU",
  authDomain: "newagent-47335.firebaseapp.com",
  databaseURL: "https://newagent-47335.firebaseio.com",
  projectId: "newagent-47335",
  storageBucket: "newagent-47335.appspot.com"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;
