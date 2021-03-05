import { Card, Button, Alert } from 'react-bootstrap';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import ImageGrid from './ImageGrid';
import ShowCard from './ShowCard';

const Dashboard = () => {

    const [error, setError] = useState("");
    const [ selectedImg, setSelectedImg ] = useState(null);
    const history = useHistory();

    const { currentUser, logout } = useAuth();

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
                    
                    <h2 className="text-center mb-4">Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <strong>Email:</strong> {currentUser.email} <br />
                    <strong>Uid:</strong> {currentUser.uid}

                    <ImageGrid setSelectedImg={setSelectedImg} currentUser={currentUser}/>

                    <Link to='update-profile' className='btn btn-primary w-100 mt-3'>
                        Update Profile
                     </Link>

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