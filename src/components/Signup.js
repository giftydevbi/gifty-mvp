
import React , {useRef, useState ,useEffect} from 'react';
import { Form, Button, Card , Alert } from 'react-bootstrap';
import {useAuth} from '../contexts/AuthContext';
import {Link, useHistory} from 'react-router-dom';

const Signup = () => {
    const emailRef= useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const history = useHistory();

    const [error,setError] = useState("");
    const [loading,setLoading] = useState(false);

    const {signup} = useAuth();
    let unsub ;

    async function handleSubmit(e) {
        e.preventDefault();

        if ( passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match');
        }

        try {
            setError('');
            setLoading(true);
            unsub = await signup(emailRef.current.value,passwordRef.current.value);
            history.push('/login',{param: "Signup Successful"});
        }
        catch (err) {
            console.log(err);
            setError(err.message);
            history.push('/login',{param: "Signup Failed"});
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
                    <h2 className="text-center mb-4">Sign Up</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required/>
                        </Form.Group>

                        <Form.Group id='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required/>
                        </Form.Group>

                        <Form.Group id='password-confirm'>
                            <Form.Label>Password-Confirm</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required/>
                        </Form.Group>

                        <Button disabled={loading} type="submit" className="w-100">Sign Up</Button>

                    </Form>
                </Card.Body>

            </Card>
            <div className="w-100 mt-2 text-center">
                Already have an Account ? <Link to='/login'>Login</Link>
            </div>
        </>
    );
}
 
export default Signup;