import { initializeApp } from 'firebase/app';
import { onAuthStateChanged, signOut, getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword,  } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAHDYutYnLP4WqqJwRgGSrrqhXYeNqFMPs",
  authDomain: "crwn-clothing-db-6ad2b.firebaseapp.com",
  projectId: "crwn-clothing-db-6ad2b",
  storageBucket: "crwn-clothing-db-6ad2b.firebasestorage.app",
  messagingSenderId: "662232646677",
  appId: "1:662232646677:web:3a5feef56c225fa16c3a1c"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);


export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase())
        batch.set(docRef, object)
    })

    await batch.commit();
    console.log('done')
}

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const {title, items} = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc; 
    }, {})

    return categoryMap;
}

export const createUserDocumentFromAuth = async (userAuth, additionalInfos={} ) => {
    if(!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);
    //console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
   // console.log(userSnapshot);
   // console.log(userSnapshot.exists());

    if(!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInfos
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }
    return userDocRef;

}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

   return await createUserWithEmailAndPassword(auth, email, password);
}
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

   return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => signOut(auth);

export const onAuthStateChangedListener = (callback) => {
    onAuthStateChanged(auth, callback,/* errorCallback, completedCallback*/)
}