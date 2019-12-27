import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCJfNiO8QDsYKQ154CuOEMLhwuUs4yRKwQ",
    authDomain: "crown-db-bed3c.firebaseapp.com",
    databaseURL: "https://crown-db-bed3c.firebaseio.com",
    projectId: "crown-db-bed3c",
    storageBucket: "crown-db-bed3c.appspot.com",
    messagingSenderId: "1039962408632",
    appId: "1:1039962408632:web:cb4b25ca79a0472c93164d",
    measurementId: "G-3K3SJVSNV2"

};

export const createUserProfileDocument = async (userAuth,additionalData) =>{
    if(!userAuth){
        return ;
    }
    console.log(userAuth);
    console.log(additionalData);

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapshot = await userRef.get();
    if(!snapshot.exists){
        //이미 존재하지 않으면
        const { displayName , email} = userAuth;
        const createAt = new Date();


        try {
            await userRef.set({
                displayName,
                email,
                createAt,
                ...additionalData,
            })
        } catch (error) {
            console.log(error);
        }
    }
    return userRef;
}
firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider(); //auth 라이브러리 접근가능
provider.setCustomParameters({prompt:'select_account'}) // pop up 

export const signInWithGoogle = () =>auth.signInWithPopup(provider);


export default firebase;

