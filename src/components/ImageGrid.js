import React from 'react';
import useFirestore from '../hooks/useFirestore';
import { useHistory } from 'react-router-dom';
import { Image, Card } from 'react-bootstrap';

const ImageGrid = ({ currentUser, setSelectedImg }) => {

    const { docs } = useFirestore('images', currentUser.uid);
    const history = useHistory();

    return (
        <div className="img-grid">
            { docs && docs.map(doc => (
                <div key={doc.id}
                    onClick={() => {
                        history.push('/showcard', { param: doc.id });
                    }
                    }
                >
                    <Card>
                        <Card.Body>
                            <h6>{doc.name}</h6>
                            <Image className='resize' src={doc.frontImage} alt='uploaded pic'
                                fluid
                            />
                        </Card.Body>
                    </Card>

                </div>
            ))}
        </div>
    );
}

export default ImageGrid;
