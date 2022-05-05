import React, { useContext } from 'react';
import { createContext, useState } from "react";
import { Alert } from 'react-native';
import { authService } from "../services/authService";

interface AuthData {
    user;
}
interface AuthContextData {
    authData?: AuthData;
    signIn: (email: string, password: string) => Promise<AuthData>;
    signInGoogle: (userInfo) => Promise<AuthData>;
    signUp: (email: string, password: string) => Promise<AuthData>;
    signUpGoogle: (userInfo) => Promise<AuthData>;
    signOut: () => Promise<AuthData>;
    checkCurrentUser: () => Promise<AuthData>;
}
export const AuthContext = createContext<AuthContextData>(
    {} as AuthContextData,
);

export const AuthProvider: React.FC = ({children}) => {

    const [authData , setAuth] = useState<AuthData>();

    async function signIn(email: string, password: string): Promise<AuthData>
    {
        try {
            const user = await authService.signIn(email, password);

            setAuth(user);
    
            return user;
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                var errorMessage = 'E-mail não cadastrado';
                Alert.alert(errorMessage, 'Favor realizar o cadastro');
            } else if (error.code === 'auth/wrong-password') {
                var errorMessage = 'Senha Inválida';
                Alert.alert(errorMessage, 'Tente novamente');
            } else {
                var errorMessage = 'Erro desconhecido';
                Alert.alert(errorMessage, 'Tente novamente');
            }
        }

    }

    async function signInGoogle(userInfo): Promise<AuthData>
    {
        try {
            const user = await authService.signInGoogle(userInfo);

            setAuth(user);
    
            return user;
        } catch (error) {
            console.log(error.code, error.message)
            signUpGoogle(userInfo);
        }

    }

    async function signUpGoogle(userInfo): Promise<AuthData>
    {
        try {
            const user = await authService.signUpGoogle(userInfo);

            setAuth(user);
    
            return user;
        } catch (error) {
            console.log(error.code, error.message)
        }

    }

    async function signUp(email: string, password: string): Promise<AuthData>
    {
        try {
            const user = await authService.signUp(email, password);

            setAuth(user);
    
            return user;
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                var errorMessage = 'E-mail já cadastrado';
                Alert.alert(errorMessage, 'Realize o login');
            } else if (error.code === 'auth/invalid-email') {
                var errorMessage = 'E-mail inválido';
                Alert.alert(errorMessage, 'Exemplo: seuemail@example.com');
            } else {
                var errorMessage = 'Erro desconhecido';
                Alert.alert(errorMessage, 'Tente novamente');
            }
        }

    }

    async function signOut()
    {
        try {
            const user = await authService.signOutUser();

            setAuth(user);
            
            return user;
        } catch (error) {
            Alert.alert(error.message, 'Tente novamente');
        }
    }

    function checkCurrentUser()
    {
        try {
            const user = authService.checkCurrentUser();
            if (user != null){
                return user;
            } else {
                var errorMessage = 'Sessão Expirou';
                Alert.alert(errorMessage, 'Voltando para o login');
                signOut
            }
        } catch (error) {
            setAuth(null)
            var errorMessage = 'Erro desconhecido';
            Alert.alert(errorMessage, 'Tente novamente');
            signOut
            return null
        }
    }

    return (
        <AuthContext.Provider value={{authData, signIn, signInGoogle, signOut, signUp, signUpGoogle, checkCurrentUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}