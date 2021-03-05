import AddPhoto from "./AddPhoto";
import React, { useEffect, useState } from 'react';
import {Button} from 'react-bootstrap';
import { useCard } from '../contexts/CardContext';
import { useHistory} from 'react-router-dom';

const AddBackImage = () => {
    const [url,setUrl] = useState(null);
    const { setBackImage , storeCardRecord } = useCard();
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();
        storeCardRecord();
        history.push('/');
    }

    useEffect( () => {
        if (url)
        setBackImage(url); 
    },[url, setBackImage]);

    return ( 
        <>
            <h3>Take photo of back</h3>
            <AddPhoto setUrl={setUrl} />
            <Button disabled={url === null} onClick={handleSubmit} type="submit" className="w-100">Done</Button>
        </>
     );
}
 
export default AddBackImage;