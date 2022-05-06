import firebase from '../config/firebaseconfig';
import { doc, setDoc, getDoc } from 'firebase/firestore/lite';

const db = firebase.db

export async function setNewUserData (email) {

    const userData = {
        activate: false,
        spread_code: '000000',
        spread_code_activate: false, 
        terms: true,
        init_date: new Date(),
        last_update: new Date(),
    };

    const userDataBalance = {
        balance: 0,
        qtd_scattering: 0,

    };

    await setDoc(doc(db, "User", email), userData);
    await setDoc(doc(db, "Balance", email), userDataBalance);
}

export async function userComplete (user) {

    const docRef = doc(db, 'User', user.email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return true
    } else {
        return false
    }
}

export async function userEmail (user) {

    const docRef = doc(db, 'User', user.email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return true
    } else {
        return false
    }
}