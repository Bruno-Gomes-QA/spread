import firebase from '../config/firebaseconfig';
import { doc, setDoc, getDoc } from 'firebase/firestore/lite';

const db = firebase.db

export async function setNewUserData (user) {

    const userData = {
        user_id: user.uid,
        user_name: 'fullName',
        user_email: user.email,
        confirmation_email: user.emailVerified,
        activate: true,
        spread_code: user.uid,
        terms: true,
        init_date: new Date(),
        last_update: new Date(),
    };

    const userDataBalance = {
        user_id: user.uid,
        balance: 0,
        qtd_scattering: 0,

    };

    await setDoc(doc(db, "User", user.email), userData);
    await setDoc(doc(db, "Balance", user.email), userDataBalance);
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