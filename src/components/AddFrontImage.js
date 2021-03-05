import AddPhoto from "./AddPhoto";
import {useHistory} from 'react-router-dom';
import React, { useState , useEffect } from 'react';
import { useCard } from '../contexts/CardContext';
import {Button} from 'react-bootstrap';

const AddFrontImage = () => {
    const [url,setUrl] = useState(null);
    const history = useHistory();
    const { setFrontImage } = useCard();

    function handleSubmit(e) {
        e.preventDefault();
        history.push('/add-photo-back');
    }

    useEffect( () => {
        if (url) {
            setFrontImage(url); 
            //console.log('Addfrontimage url = ' + url);
        }
    },[url, setFrontImage]);

    return ( 
        <>
            <h5 className="w-100 mt-2 text-center">Photo: Front of Card</h5>
            <AddPhoto setUrl={setUrl} />
            <Button disabled={url === null} onClick={handleSubmit} type="submit" className="w-100">Next</Button>
        </>
     );
}
 
export default AddFrontImage;