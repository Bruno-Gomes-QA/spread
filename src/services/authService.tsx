import {AuthData} from '../contexts/Auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updatePassword } from "firebase/auth";
import { getUserInfo, setNewPassword } from './firestoreService';

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

async function changePassword(email: string, newPassword: string): Promise<AuthData> {
    return new Promise(async (resolve, reject) => {
        const auth = getAuth();
        const userInfo = await getUserInfo(email)
        signInWithEmailAndPassword(auth, email, userInfo['password'])
            .then((userCredential) => {
                const user = userCredential.user;
                updatePassword(user, newPassword)
                    .then(() => {
                        setNewPassword(email, newPassword)
                    resolve ({
                        user,
                    });
                })
                .catch((error) => {
                    reject((error));
                });
            })
            .catch((error) => {
                reject((error))
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

export const authService = {signIn, signUp, changePassword, signOutUser, checkCurrentUser};