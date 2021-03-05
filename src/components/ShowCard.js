
import React, { useState, useEffect } from 'react';
import { Button, Card, Image } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
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
                    <h4 className="text-center mb-2">{doc.name}</h4>
                    <h5 className="text-center mb-2">Number: {doc.number}</h5>
                    <h5 className="text-center mb-2">Pin: {doc.pin}</h5>
                </Card.Body>}
            </Card>

            <Card>
                {dbReadComplete && <Card.Body>
                    <h5 className="text-center mb-2">Front</h5>
                    <Image src={doc.frontImage} alt='frontimage' fluid />
                </Card.Body>}
            </Card>

            <Card>
                {dbReadComplete && <Card.Body>
                    <h5 className="text-center mb-2">Back</h5>
                    <Image src={doc.backImage} alt='backimage' fluid />
                </Card.Body>}
            </Card>

            <Card>
                {dbReadComplete && <Card.Body>
                    <Button onClick={handleClick} className="w-100">Close</Button>
                </Card.Body>}
            </Card>

        </>
    );
}

export default ShowCard;