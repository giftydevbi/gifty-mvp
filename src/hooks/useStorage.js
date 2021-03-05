import { useState, useEffect } from 'react';
import { projectStorage, projectFirestore, timestamp } from '../firebase';

const useStorage = (file,currentUser) => {

    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);

    useEffect(() => {
        //References
        const storageRef = projectStorage.ref();
        // const collectionRef = projectFirestore.collection('images');
        // const uid = currentUser.uid;
        // const email = currentUser.email;

        //const childRef = storageRef.child(`images/${uid}/` + file.name);
        const childRef = storageRef.child('images/' + file.name);

        childRef.put(file).on('state_changed', (snap) => {
            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
            setProgress(percentage);
        }, (err) => {
            setError(err);
        }, async () => {
            const url = await childRef.getDownloadURL();
            setUrl(url);
            //create a database record
            // collectionRef.add({
            //     uid: uid,
            //     email: email,
            //     url: url,
            //     createdAt: timestamp()
            // })
        });

    }, [currentUser.email, currentUser.uid, file]);

    return { url, progress, error };
}

export default useStorage;