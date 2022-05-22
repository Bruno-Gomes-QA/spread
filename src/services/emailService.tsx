import firebase from '../config/firebaseconfig';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore/lite';
import { htmlText } from '../components/templateEmail';

const db = firebase.db

export async function setNewEmail (email) {

    const code = Math.floor(Math.random() * 999999) + 10000
    const emailData = {
        to: [email],
        message: {
            subject: 'Código de confirmação',
            text: '',
            html: htmlText(code.toString())
        },
        code: code.toString()
    };
    
    const newEmailPath = "mail/"+email+code;
    const newEmailRef = doc(db, newEmailPath);

    await setDoc(newEmailRef, emailData);

    return code
}

export async function validateCode (email, code) {

    let valideCode = false
    const collectionRef = collection(db, "mail")
    const emailQuery = query(collectionRef, where("code", "==", code));

    const codeResult = await getDocs(emailQuery);
    codeResult.forEach((doc) => {
        if (doc.id === email+code) {
            valideCode = true
        } else {
            valideCode = false
        }
      });

    return valideCode
}