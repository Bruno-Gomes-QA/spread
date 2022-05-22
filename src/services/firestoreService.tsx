import firebase from '../config/firebaseconfig';
import { doc, setDoc, getDoc, getDocs, updateDoc, collection, query, where } from 'firebase/firestore/lite';
import { useState } from 'react';

const db = firebase.db

export async function setNewUserData (email, phoneNumber, cpf, fullName, birthDay, cep, state, city, district, street, houseNumber) {

    const userData = {
        email: email,
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
        house_number: houseNumber,
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

export async function setCpfFullName(userEmail, cpf, fullName, birthDay) {

    const docRef = doc(db, 'User', userEmail);
    return await updateDoc(docRef, {
        cpf: cpf,
        full_name: fullName,
        birth_day: birthDay
      });
}

export async function setCepData(userEmail, cep, street, district, city, state, houseNumber, complement) {

    const docRef = doc(db, 'User', userEmail);
    return await updateDoc(docRef, {
        cep: cep,
        state: state,
        city: city,
        district: district,
        street: street,
        house_number: houseNumber,
        complement: complement,
      });

}

export async function getUserInfo (user) {

    const docRef = doc(db, "User", user.email);
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