
import React, { useEffect, useRef, useState } from 'react';
import { Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import GoogleButton from 'react-google-button';

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const history = useHistory();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { login, googleLogin } = useAuth();
    let unsub;

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setError('');
            setLoading(true);
            unsub = await login(emailRef.current.value, passwordRef.current.value);
            history.push('/');
        }
        catch (err) {
            console.log(err);
            setError(err.message);
        }
        setLoading(false);
    }

    async function handleGoogleLogin(e) {
        e.preventDefault();
        try {
            setError('');
            setLoading(true);
            unsub = await googleLogin();
            history.push('/');
        }
        catch (err) {
            console.log(err);
            setError(err.message);
        }
        setLoading(false);
    }

    useEffect(() => {
        return () => unsub;
    });

    return (
        <>
            <Card>
                <Card.Body>

                    <Row className="justify-content-md-center">
                        <Col xs={12} sm={4} md={4}>
                            <img
                                alt=""
                                src="/gifte-logo.png"
                                width="100"
                                height="100"
                                className="d-inline-block align-center"
                            />
                        </Col>
                    </Row>


                    {error && <Alert variant="danger">{error}</Alert>}

                    <GoogleButton className="w-100 text-center mt-3"
                        onClick={handleGoogleLogin}
                    />
                </Card.Body>
            </Card>

            <Card>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>

                        <Form.Group id='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>

                        <Button disabled={loading} type="submit" className="w-100">Log In</Button>

                    </Form>
                    <div className="w-100 mt-3 text-center">
                        <Link to='/forgot-password'>Forgot Password ?</Link>
                    </div>
                    <div className="w-100 mt-2 text-center">
                        No Account ? <Link to='/signup'>Sign up</Link>
                    </div>


                </Card.Body>
            </Card>



        </>
    );
}

export default Login;