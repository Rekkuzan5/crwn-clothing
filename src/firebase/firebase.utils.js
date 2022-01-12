import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const config = {
  apiKey: "AIzaSyCTFclVMPNVF4vEnUP-vahdQvsuYUNxvHg",
  authDomain: "crwn-db-a9e43.firebaseapp.com",
  projectId: "crwn-db-a9e43",
  storageBucket: "crwn-db-a9e43.appspot.com",
  messagingSenderId: "650654777914",
  appId: "1:650654777914:web:29a85393f777b7e8336b03",
  measurementId: "G-25WKQT5S75",
};

export const createUserProfileDocument =
  async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapshot = await userRef.get();

    console.log(snapshot);
/*     console.log(firestore.doc("users/123sdfsdfg"));
 */  
    if(!snapshot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }

    return userRef;

};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
