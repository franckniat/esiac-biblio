"use client";
import { auth } from "@/firebase/config";
import { NextOrObserver, User, signOut as authSignOut, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { createContext, useEffect, useState } from "react";

type AuthContextType = {
    user : User | null,
    loading : boolean,
    signOut : ()=> Promise<void>
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    loading:true,
    signOut : async()=>{}
});

export const useFirebaseAuth = () => {
    const [user, setUser] = useState<User|null>(null);
    const [loading, setLoading] = useState(true);
    const router= useRouter();
    const clearUser = ()=>{
        setUser(null);
        setLoading(false);
    }
    const signOut = async ()=>{
        authSignOut(auth).then(clearUser);
        router.push("/");
    }
    const authStateChanged: NextOrObserver<User | null> = async (user:User|null) => {
        setLoading(true)
        if(!user){
            clearUser();
            return;
        }
        setUser(user);
        setLoading(false);
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, authStateChanged);

        return ()=>{unsubscribe()}
    })

    return {
        user,
        loading,
        setUser,
        signOut
    }
}

export const AuthUserProvider = ({children}:{children:React.ReactNode}) => {
    const auth = useFirebaseAuth();
    return(
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    )
}