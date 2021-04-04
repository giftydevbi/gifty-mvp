import { Card, Button, Alert, Modal, Form, Container, Row, Col } from 'react-bootstrap';
import { useEffect, useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import ImageGrid from './ImageGrid';

const querystring = require('querystring');

const Dashboard = () => {

    const [modalShow, setModalShow] = useState(false);
    const [error, setError] = useState("");
    const [displayProfile, setDisplayProfile] = useState(false);
    const [emailStatus, setEmailStatus] = useState({
        show: false,
        message: "SUCCESS: Email sent to giftE",
        variant: "success"
    });

    //const loggedInWithGoogleLS = localStorage.getItem('loggedInWithGoogle') ;

    const history = useHistory();
    const subjectRef = useRef();
    const messageRef = useRef();

    const handleModalShow = () => setModalShow(true);
    const handleModalClose = () => setModalShow(false);

    const { currentUser, logout , loggedInWithGoogle } = useAuth();

    const submitRequest = async (e) => {
        e.preventDefault();

        const giftyToken = "yUo1MMCjCpnH1Tu7wtDo";

        console.log(`from email: ${currentUser.email}`);

        fetch("https://gifty.live/Lu6wZPCcHdyUJN5upWly", {
            method: 'POST',
            mode: "no-cors",
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            },
            body: querystring.stringify({
                "email": currentUser.email,
                "subject": subjectRef.current.value,
                "message": messageRef.current.value,
                "token": giftyToken
            })
        })
            .then(response => {
                setEmailStatus({ ...emailStatus, show: true });
                console.log(`SUCCESS::response = ${JSON.stringify(response)}`);
                handleModalClose();
            })
            .catch(err => {
                setEmailStatus({
                    ...emailStatus, show: true,
                    message: "FAILED: Unable to send email to giftE",
                    variant: "danger"
                })
                console.log(`FAIL::Fetch status = ${err}`);
                handleModalClose();
            })
    };

    useEffect(() => {
        if (loggedInWithGoogle === true )
            setDisplayProfile(false);
        else
            setDisplayProfile(true);
    }, [loggedInWithGoogle])

    async function handleLogout() {
        setError('');
        localStorage.getItem('loggedInWithGoogle',false)
        try {
            await logout();
            history.push('/login');
        }
        catch (err) {
            setError('Failed to Log out');
        }
    }

    return (
        <>
            <Card>
                <Card.Body>

                    <h5 className="text-center mb-4">Card Wallet</h5>
                    {error && <Alert variant="danger">{error}</Alert>}

                    <Alert variant="info">{currentUser.email} </Alert>

                    <ImageGrid currentUser={currentUser} />

                    { displayProfile && <Link to='update-profile' className='btn mb-3 btn-primary w-100'>
                        Update Profile
                     </Link>}

                    <Link to='add-card' className='btn btn-info w-100'>
                        Add Card
                     </Link>

                </Card.Body>
            </Card>

            <Card>
                <Card.Body>
                    <Container>
                        <Row>
                            {emailStatus.show &&
                                <Alert variant={emailStatus.variant}>{emailStatus.message}</Alert>
                            }
                        </Row>
                        <Row>
                            <Col>
                                <a rel="noreferrer" href="https://itsgifte.com" className="btn-outline-dark btn w-100">About giftE</a>
                            </Col>
                            <Col>
                                <Button onClick={handleModalShow} className="w-100" variant="outline-dark" >Contact</Button>
                            </Col>
                        </Row>
                    </Container>
                </Card.Body>
            </Card>

            <Modal size='lg' show={modalShow} onHide={handleModalClose}>
                <Modal.Header closeButton>Email the giftE Team
                </Modal.Header>
                <Modal.Body>

                    <Form.Group id='subject'>
                        <Form.Label>Subject: </Form.Label>
                        <Form.Control type="text" ref={subjectRef} required />
                    </Form.Group>

                    <Form.Group id='message'>
                        <Form.Label>Message: </Form.Label>
                        <Form.Control as="textarea" rows={5} ref={messageRef} />
                    </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={submitRequest} className="text-center">
                        Send
                    </Button>
                    <Button variant="secondary" onClick={handleModalClose} className="text-center">
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className="w-100 text-center">
                <Button variant='link' onClick={handleLogout}>Logout</Button>
            </div>
        </>
    );
}

export default Dashboard;