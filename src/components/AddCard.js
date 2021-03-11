
import React, { useRef, useState } from 'react';
import { Form, Button, Card , InputGroup, FormControl } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useCard } from '../contexts/CardContext';
import { useHistory, Link } from 'react-router-dom';

const AddCard = () => {
    const nameRef = useRef();
    const numberRef = useRef();
    const pinRef = useRef();
    const history = useHistory();

    const [loading, setLoading] = useState(false);

    const { currentUser } = useAuth();
    const { setName, setNumber, number, setPin, setCurrentUser } = useCard();

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

                        <Form.Group id='number'>
                            <Form.Label>Number</Form.Label>

                            <InputGroup className="mb-3">
                                <FormControl
                                    type="text" ref={numberRef} value={number} placeHolder={number}
                                    aria-label="Number"
                                    aria-describedby="basic-addon2"
                                />
                                <InputGroup.Append>
                                    <Button onClick={handleClick} variant="primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-upc-scan" viewBox="0 0 16 16">
                                        <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5zM3 4.5a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-7zm3 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7z"/>
                                    </svg>
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group id='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" ref={nameRef} required />
                        </Form.Group>

                        <Form.Group id='pin'>
                            <Form.Label>PIN</Form.Label>
                            <Form.Control type="text" ref={pinRef} />
                        </Form.Group>
                        <Button disabled={loading} type="submit" className="w-100">Next</Button>

                    </Form>

                    <div className="w-100 mt-3 text-center">
                        <Link to='/'>Cancel</Link>
                    </div>

                </Card.Body>

            </Card>

        </>
    );
}

export default AddCard;