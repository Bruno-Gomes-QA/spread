import {AuthData} from '../contexts/Auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";

async function signIn(email: string, password: string): Promise<AuthData> {
    return new Promise((resolve, reject) => {

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            resolve ({
                user,
            });
        })
        .catch((error) => {
            reject((error))
        });
    })
}

async function signUp(email: string, password: string): Promise<AuthData> {
    return new Promise((resolve, reject) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            resolve ({
                user,
            });
        })
        .catch((error) => {
            reject((error));
        });
    })
}

async function signOutUser(): Promise<AuthData> {
    return new Promise((resolve, reject) => {
        const auth = getAuth();
        const user = null;
        signOut(auth).then(() => {
            resolve ((user));
        }).catch((error) => {
            reject((error));
        });
    })
}

function checkCurrentUser() {
    const auth = getAuth()
    const user = auth.currentUser;
    if (user != null) {
        return user
    } else {
        return false
    }
}

export const authService = {signIn, signUp, signOutUser, checkCurrentUser};