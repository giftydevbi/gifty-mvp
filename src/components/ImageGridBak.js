import React from 'react';
import useFirestore from '../hooks/useFirestore';
import { motion } from 'framer-motion';
import { useHistory } from 'react-router-dom';

const ImageGrid = ({ currentUser, setSelectedImg }) => {

    const { docs } = useFirestore('images', currentUser.uid);
    const history = useHistory();

    return (
        <div className="img-grid">
            { docs && docs.map(doc => (
                <motion.div className="img-wrap" key={doc.id}
                    whileHover={{ opacity: 1 }}
                    layout
                    onClick={() => {
                        history.push('/showcard', { param: doc.id });
                    }
                    }
                >
                    <motion.img src={doc.frontImage} alt='uploaded pic'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    />
                </motion.div>
            ))}
        </div>
    );
}

export default ImageGrid;
