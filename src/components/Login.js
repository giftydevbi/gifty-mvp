
import React, { useEffect, useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory, useLocation } from 'react-router-dom';
import GoogleButton from 'react-google-button';

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const history = useHistory();
    const location = useLocation();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [signupSuccess, setSignupSuccess] = useState(false);
    const [signupFail, setSignupFail] = useState(false);

    const { login, googleLogin } = useAuth();
    let unsub;

    useEffect( ()=> {
        if ( location.state ) {
            if (location.state.param === "Signup Successful")
                setSignupSuccess(true);
            if (location.state.param === "Signup Failed")
                setSignupFail(true);
        }
    },[location.state])

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

                    <Card.Title className="text-center">
                    <img
                                alt=""
                                src="/gifte-logo.png"
                                width="100"
                                height="100"
                                className="d-inline-block align-center"
                            />
                    </Card.Title>

                    {error && <Alert variant="danger">{error}</Alert>}

                    <GoogleButton className="w-100 text-center mt-3"
                        onClick={handleGoogleLogin}
                    />
                </Card.Body>
            </Card>

            <Card>
                <Card.Body>

                    { signupSuccess &&  <Alert variant="success">{location.state.param}</Alert>}
                    { signupFail &&  <Alert variant="danger">{location.state.param}</Alert>}

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