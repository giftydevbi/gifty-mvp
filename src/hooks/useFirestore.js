import { useState, useEffect } from 'react';
import { projectFirestore } from '../firebase';

const useFirestore = (collection,uid) => {
    const [docs, setDocs] = useState([]);

    useEffect(() => {
        setDocs([]);
        const collectionRef = projectFirestore.collection(collection);
        const unsub = collectionRef.where('uid','==',uid)
            .orderBy('createdAt', 'desc')
            .onSnapshot((snap) => {
                let documents = [];
                snap.forEach(doc => {
                    documents.push({
                        ...doc.data(), id: doc.id
                    });
                });
                setDocs(documents);
            });

        return () => unsub();

    }, [collection, uid])
    
    return { docs };
}

export default useFirestore;