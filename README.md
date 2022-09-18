Para rodar o projeto:

1 - git clone git@github.com:Bruno-Gomes-QA/spread.git
2 - cd .\spread
3 - npm install
4 - Criar em "src" uma pasta chamada "config"
5 - Criar dois arquivos chamados "firebaseconfig.js" e "mercadopago.json"
6 - Em "firebaseconfig.js" inserir:

    import { initializeApp } from "firebase/app";
    import { getFirestore} from 'firebase/firestore/lite';

    const firebaseConfig = {
    apiKey: "AIzaSyBxfgvFSYdrZ0zR595qgJu7r1zjHyez--Y",
    authDomain: "spread-349216.firebaseapp.com",
    projectId: "spread-349216",
    storageBucket: "spread-349216.appspot.com",
    messagingSenderId: "954890227561",
    appId: "1:954890227561:web:b2e50f32d95149cd87f7f8",
    measurementId: "G-S77MRMWDS7"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app)

    export default {
    app,
    db
    };

7 - Em "mercadopago.json" inserir:

    {
        "url": "https://spread-api.vercel.app/api/mercadopago/createPayment",
        "secretKey": "TEST-3199912320387235-091004-13b6ef51c3ec594f92f3e38f7cc5ee5a-219283061"
    }

8 - As secrets acima correspondem ao banco e api para teste.
