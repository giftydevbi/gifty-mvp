import React, { useContext , useState, useEffect } from 'react';
import { auth } from '../firebase';
import firebase from 'firebase/app'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext) ;
}

export function AuthProvider( {children}) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    const [loggedInWithGoogle, setLoggedInWithGoogle] = useState(false);

    const googleProvider = new firebase.auth.GoogleAuthProvider();

    function signup(email,password) {
        return auth.createUserWithEmailAndPassword(email,password);
    } 
    
    function login(email,password) {
        setLoggedInWithGoogle(false);
        return auth.signInWithEmailAndPassword(email,password);
    }

    function googleLogin() {
        setLoggedInWithGoogle(true);
        return auth.signInWithPopup(googleProvider);
    }

    function logout() {
        return auth.signOut();
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email);
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email);
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password);
    }

    useEffect( () => {
        const unsubscribe = auth.onAuthStateChanged( user => {
            setCurrentUser(user);
            setLoading(false);
        })
        return unsubscribe;
    },[]);

    const value = {
        currentUser, signup, login, logout,
        resetPassword,updateEmail,updatePassword, 
        googleLogin, loggedInWithGoogle
    }

    return(
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}