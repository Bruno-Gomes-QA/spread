import firebase from '../config/firebaseconfig';
import { doc, setDoc, getDoc, getDocs, updateDoc, collection, query, where } from 'firebase/firestore/lite';

const db = firebase.db

export async function setNewUserData (email, password, phoneNumber, cpf, fullName, birthDay, cep, state, city, district, street) {

    const userData = {
        email: email,
        password: password,
        phone_number: phoneNumber,
        cpf: cpf,
        full_name: fullName,
        birth_day: birthDay,
        country: 'Brasil',
        cep: cep,
        state: state,
        city: city,
        district: district,
        street: street,
        balance: 0,
        spreading: 0,
        terms: true,
        first_login: true,
        init_date: new Date(),
        last_update: new Date(),
    };
    
    const userDataPath = "User/"+email;
    const userDataRef = doc(db, userDataPath);
    
    return await setDoc(userDataRef, userData);
}

export async function setNewCodeData (email) {

    const code = Math.random().toString(36).replace(/[^a-z]+/g, '')
    const codeData = {
        email: email,
        code: code
    };
    
    const codeDataPath = "Codes/"+email;
    const codeDataRef = doc(db, codeDataPath);
    
    return await setDoc(codeDataRef, codeData);
}

export async function setNewPassword (email, password) {
    
    const userRef = doc(db, "User", email);

    await updateDoc(userRef, {
        password: password
    });
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

export async function getUserInfo (email) {

    const docRef = doc(db, "User", email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists) {
        return docSnap.data()
    } else {
        return false
    }
}

export async function UserExist (email, phoneNumber, cpf) {

    let emailornumberorcpfExist = false

    const collectionRef = collection(db, "User")
    const emailQuery = query(collectionRef, where("email", "==", email));
    const numberQuery = query(collectionRef, where("phone_number", "==", phoneNumber));
    const cpfQuery = query(collectionRef, where("cpf", "==", cpf));

    const emailResult = await getDocs(emailQuery);
    if(emailResult.size > 0) {emailornumberorcpfExist = true};

    const numberResult = await getDocs(numberQuery);
    if(numberResult.size > 0) {emailornumberorcpfExist = true};

    const cpfResult = await getDocs(cpfQuery);
    if(cpfResult.size > 0) {emailornumberorcpfExist = true};

    return emailornumberorcpfExist
}

export async function ValideCode (code) {

    let valideCode = false

    const collectionRef = collection(db, "Codes")
    const codeQuery = query(collectionRef, where("code", "==", code));

    const codeResult = await getDocs(codeQuery);
    if(codeResult.size > 0) {valideCode = true};
    console.log(valideCode)
    return valideCode
}

export async function UserHaveCode (email) {

    //let x = 1
    const docRef = doc(db, "Codes", email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists) {
        return docSnap.data()
    } else {
        return false
    }
}