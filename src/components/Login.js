
import React, { useEffect, useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const history = useHistory();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    let unsub  ;

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

    useEffect( () => {
        return () => unsub ;
    });

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Login</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
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
                </Card.Body>

            </Card>
            <div className="w-100 mt-2 text-center">
                No Account ? <Link to='/signup'>Sign up</Link>
            </div>
        </>
    );
}

export default Login;