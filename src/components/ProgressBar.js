import React, { useEffect } from 'react';
import useStorage from '../hooks/useStorage';
import {motion} from 'framer-motion';

const ProgressBar = ({currentUser, file, setFile}) => {

    console.log('progress bar file = ' + JSON.stringify(file));
    const { url, progress } = useStorage(file,currentUser);
    console.log(url, progress);

    useEffect( ()=> {
        if (url) {
            setFile(null);
        }
    } ,[url,setFile] )

    return (  
        <motion.div className="progress-bar" 
            initial={{width:0}}
            animate={{width:progress + '%'}}
            >
        </motion.div>
    );
}
 
export default ProgressBar ;