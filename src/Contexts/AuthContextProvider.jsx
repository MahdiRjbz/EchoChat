import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, setDoc, doc } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { isMobile } from 'react-device-detect';
import { db } from '../Firebase';
import { auth } from '../Firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Loading from '../Components/Loading/Loading';

export const AuthContext = React.createContext();

const AuthContextProvider = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(false);
    const navigate = useNavigate();
    const [existed, setExisted] = useState(null);
    
    const userCol = collection(db, "users");
    const [users, loading1, , ] = useCollectionData(userCol);

    useEffect(()  => {
        users ? users.forEach((item) => user.email === item.email ? setExisted(true) : setExisted(false)) : null;
    }, [users ,loading1])

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user)
            if (isMobile && user) {
                navigate('/welcome')
            } else if (user) {
                navigate('/chats')
            } else {
                navigate('/login')
            }
            setLoading(false)

            if (existed === false && loading1 === false) {                
                const docRef = doc(db, "users", user.email)
                setDoc(docRef, {
                    email: user.email,
                    name: user.displayName,
                    photoURL: user.photoURL,
                    phone: user.phoneNumber,
                });
            }
        })
    }, [user, loading1, existed, users])
    
    return (
        <AuthContext.Provider value={user}>
            {loading ? <Loading /> : children}
        </AuthContext.Provider>
    );
};


export default AuthContextProvider;