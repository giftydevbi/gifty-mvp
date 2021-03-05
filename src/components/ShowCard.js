
import React, { useState, useEffect } from 'react';
import { Button, Card ,Image} from 'react-bootstrap';
import { useHistory , useLocation } from 'react-router-dom';
import { projectFirestore } from '../firebase';

const ShowCard = ({ selectedImg }) => {

    const [doc, setDoc] = useState(null);
    const [dbReadComplete, setDbReadComplete] = useState(false);

    const history = useHistory();
    const location = useLocation();

    useEffect(() => {

        setDoc(null);

        const collectionRef = projectFirestore.collection('images');

        console.log('selectedimg = ' + location.state.param);

        collectionRef.doc(location.state.param).get()
            .then(doc => {
                if (doc) {
                    console.log(doc.data());
                    setDoc(doc.data());
                    setDbReadComplete(true);
                }
                else
                    console.log('doc is undefined');
            })
            .catch(err => {
                console.log('showcard error = ' + err.message);
            })
        //return () => unsub();

    }, [location.state.param])

    function handleClick(e) {
        e.preventDefault();
        history.push('/');
    }

    return (
        <>
            <Card>
                {dbReadComplete && <Card.Body>

                    <h3 className="text-center mb-4">{doc.name}</h3>

                    <h4 className="text-center mb-4">{doc.number}</h4>

                    <h4 className="text-center mb-4">{doc.pin}</h4>

                    <h4 className="text-center mb-4">Front</h4>
                    <Image  src={doc.frontImage} alt='frontimage' fluid/>

                    <h4 className="text-center mb-4">Back</h4>
                    <Image  src={doc.backImage} alt='backimage' fluid/>

                    <Button onClick={handleClick} className="w-100">Close</Button>

                </Card.Body>}

            </Card>

        </>
    );
}

export default ShowCard;