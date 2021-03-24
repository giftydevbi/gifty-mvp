
import React, { useState, useEffect } from 'react';
import { Button, Card, Image, Modal } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import { projectFirestore } from '../firebase';
import { projectStorage } from '../firebase';

const ShowCard = ({ selectedImg }) => {

    const [modalShow, setModalShow] = useState(false);
    const [doc, setDoc] = useState(null);
    const [dbReadComplete, setDbReadComplete] = useState(false);

    const history = useHistory();
    const location = useLocation();

    const handleModalShow = () => setModalShow(true);
    const handleModalClose = () => setModalShow(false);

    useEffect(() => {

        setDoc(null);
        const collectionRef = projectFirestore.collection('images');

        collectionRef.doc(location.state.param).get()
            .then(document => {
                if (document) {
                    //console.log(doc.data());
                    setDoc(document.data());
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

    function handleClose(e) {
        e.preventDefault();
        history.push('/');
    }

    function handleDelete(e) {
        e.preventDefault();

        const collectionRef = projectFirestore.collection('images');

        //Get frontimage
        const frontImageRef = projectStorage.refFromURL(doc.frontImage);
        const backImageRef = projectStorage.refFromURL(doc.backImage);

        frontImageRef.delete()
        .then( frontDeleteResult => {
            //console.log(frontDeleteResult);
            return backImageRef.delete();
        })
        .then( backDeleteResult => {
            //console.log(backDeleteResult);
            return  collectionRef.doc(location.state.param).delete();
        })
        .then(docDeleteResult => {
            //console.log(docDeleteResult);
            history.push('/');
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <>
            <Card>
                {dbReadComplete && <Card.Body>
                    <h4 className="text-center mb-2">{doc.name}</h4>
                    <h5 className="text-left mb-2"><span className="text-muted"> Number: </span> {doc.number}</h5>
                    <h5 className="text-left mb-2"><span className="text-muted"> Amount: </span> 
                     { doc.amount ? ("$" + doc.amount) : " Not specified"}</h5>
                    <h5 className="text-left mb-2"><span className="text-muted"> PIN: </span> {doc.pin}</h5>
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
                    <Button onClick={handleClose} className="w-100">Close</Button>
                </Card.Body>}
            </Card>

            <Card>
                {dbReadComplete && <Card.Body>
                    <Button onClick={handleModalShow} className="btn-danger w-100">Delete</Button>
                </Card.Body>}
            </Card>

            <Modal size='sm' show={modalShow} onHide={handleModalClose}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>Confirm Card Deletion</Modal.Body>
                <Modal.Footer>
                <Button variant="danger" onClick={handleDelete} className="text-center">
                        OK
                    </Button>
                    <Button variant="secondary" onClick={handleModalClose} className="text-center">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    );
}

export default ShowCard;