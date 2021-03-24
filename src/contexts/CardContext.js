import React, { useContext , useState, useEffect } from 'react';
import { projectFirestore, timestamp } from '../firebase';

const CardContext = React.createContext()

export function useCard() {
    return useContext(CardContext) ;
}

//Hold all the state for the card here
//until final commit to firestore database
export function CardProvider( {children}) {
    const collectionRef = projectFirestore.collection('images');

    const [currentUser, setCurrentUser] = useState(null);
    const [name, setName] = useState();
    const [amount, setAmount] = useState();
    const [number, setNumber] = useState();
    const [pin, setPin] = useState();
    const [frontImage, setFrontImage] = useState();
    const [backImage, setBackImage ] = useState();
    const [loading, setLoading] = useState(true);
    const [scanSuccess, setScanSuccess] = useState(false);

    useEffect( () => {
        setLoading(false);
    },[]);

    function storeCardRecord() {
        let record = {
            uid: currentUser.uid,
            name:name,
            number:number,
            amount:amount,
            pin:pin,
            email: currentUser.email,
            frontImage: frontImage,
            backImage: backImage,
            createdAt: timestamp()
        };
        //console.log('storeCardRecord = '  + JSON.stringify(record));
        collectionRef.add(record)
        .then( result => (true) )
        .catch( err => console.log(err.message));
    }

    const value = {
        setName,setNumber,number,
        setPin,setFrontImage,setAmount,
        setBackImage,storeCardRecord,
        setCurrentUser,
        scanSuccess,
        setScanSuccess
    }

    return(
        <CardContext.Provider value={value}>
            {!loading && children}
        </CardContext.Provider>
    )
}