import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/Firebase.config";
import axios from "axios";
export const AuthContext = createContext(null)
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider()
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const loginUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = async() => {
        setLoading(true)
         const {data} =  await axios(`https://server-navy-two-99.vercel.app/logout`,{withCredentials:true})
        console.log(data);
         return signOut(auth)
    }
    const profileUpdate = (name, image) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: image,
        }).then(() => {
            setUser((prevUser) => ({
                ...prevUser,
                displayName: name,
                photoURL: image,
            }));
        }).catch((error) => {
            console.error('Profile update error:', error);
        });
    };


    const googleLogin = ()=>{
        setLoading(true)
        return signInWithPopup(auth,googleProvider)
    }

   

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false)
        })
        return () => {
            unSubscribe();
        }
    }, [])


    const authInfo = { createUser, loginUser, user, logOut, loading, profileUpdate, googleLogin}
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;