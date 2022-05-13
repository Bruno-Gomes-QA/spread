import firebase from '../config/firebaseconfig';
import { doc, setDoc, getDoc, updateDoc, collection } from 'firebase/firestore/lite';

const db = firebase.db

export async function setNewUserData (email) {

    const userData = {
        balance: 0,
        spreading: 0,
        terms: true,
        first_login: true,
        init_date: new Date(),
        last_update: new Date(),
    };
    
    const userDataPath = "User/"+email;
    const userDataRef = doc(db, userDataPath);
    
    await setDoc(userDataRef, userData);
}

export async function setNewWithdraw (email) {

    const userData = {
        balance: 0,
        spreading: 0,
        terms: true,
        init_date: new Date(),
        last_update: new Date(),
    };

    const userDataPath = "User/"+email;
    const userWithdrawPath = userDataPath+"/Withdraw";
    const userPaymentsPath = userDataPath+"/Payments";
    const userSpreadCodePath = userDataPath+"/SpreadCode";
    const userSpreadingPath = userDataPath+"/Spreading";

    doc(collection(db, userWithdrawPath));
    doc(collection(db, userPaymentsPath));
    doc(collection(db, userSpreadCodePath));
    doc(collection(db, userSpreadingPath));
    const userDataRef = doc(db, userDataPath);
    
    await setDoc(userDataRef, userData);

    const withdrawRegistrerRef = doc(collection(db, userWithdrawPath, "Teste"));
    
    await setDoc(withdrawRegistrerRef, userData);
}

export async function setFirstLogin(user) {

    const docRef = doc(db, "User", user.email);
    await updateDoc(docRef, {
        first_login: false
      });

}

export async function getUserInfo (user) {

    const docRef = doc(db, "User", user.email);
    const docSnap = await getDoc(docRef);

    return docSnap.data()
}