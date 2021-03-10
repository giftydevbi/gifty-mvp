
import React , {useRef, useState } from 'react';
import { Form, Button, Card  } from 'react-bootstrap';
import {useAuth} from '../contexts/AuthContext';
import {useCard} from '../contexts/CardContext';
import {useHistory} from 'react-router-dom';

const AddCard = () => {
    const nameRef= useRef();
    const numberRef = useRef();
    const pinRef = useRef();
    const history = useHistory();

    const [loading,setLoading] = useState(false);

    const {currentUser} = useAuth();
    const { setName, setNumber, number, setPin, setCurrentUser} = useCard();

    async function handleSubmit(e) {
        e.preventDefault();

        setName(nameRef.current.value);
        setNumber(numberRef.current.value);
        setPin(pinRef.current.value);
        setCurrentUser(currentUser);

        history.push('/add-photo-front');

        setLoading(false);
    }

    function handleClick(e) {
        e.preventDefault();
        history.push('/scan-barcode');
    }

    return (  
        <>
            <Card>
                <Card.Body>

                    <h2 className="text-center mb-4">Card Info</h2>

                    <Form onSubmit={handleSubmit}>

                        <Form.Group id='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" ref={nameRef} required/>
                        </Form.Group>

                        <Form.Group id='number'>
                            <Form.Label>Number</Form.Label>
                            <Form.Control type="text" ref={numberRef} value={number} placeHolder={number} />
                            <Button onClick={handleClick} className="w-50">Scan Barcode</Button>
                        </Form.Group>

                        <Form.Group id='pin'>
                            <Form.Label>PIN</Form.Label>
                            <Form.Control type="text" ref={pinRef} />
                        </Form.Group>

                        <Button disabled={loading} type="submit" className="w-100">Next</Button>

                    </Form>

                </Card.Body>

            </Card>

        </>
    );
}
 
export default AddCard;