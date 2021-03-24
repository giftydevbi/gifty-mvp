import { Card, Button, Alert } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import ImageGrid from './ImageGrid';

const Dashboard = () => {

    const [error, setError] = useState("");
    const [displayProfile, setDisplayProfile] = useState(false);
    const history = useHistory();

    const { currentUser, logout , loggedInWithGoogle} = useAuth();

    useEffect( () => {
        if ( loggedInWithGoogle )
            setDisplayProfile(false);
        else
            setDisplayProfile(true);
    },[loggedInWithGoogle])

    async function handleLogout() {
        setError('');

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

                    <ImageGrid currentUser={currentUser}/>

                    {displayProfile && <Link to='update-profile' className='btn btn-primary w-100 mt-3'>
                        Update Profile
                     </Link>}

                    <Link to='add-card' className='btn btn-info w-100 mt-3'>
                        Add Card
                     </Link>

                </Card.Body>
            </Card>

            <div className="w-100 mt-2 text-center">
                <Button variant='link' onClick={handleLogout}>Logout</Button>
            </div>
        </>
    );
}

export default Dashboard;