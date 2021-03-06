import React, { useState } from 'react';
import { IconButton } from '@material-ui/core';
import PhotoCameraRoundedIcon from "@material-ui/icons/PhotoCameraRounded";
import ProgressBar from './ProgressBar';
import { useAuth } from '../contexts/AuthContext';
import { Image, Card } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100%",
        textAlign: 'center',
    },
    imgBox: {
        maxWidth: "80%",
        maxHeight: "80%",
        margin: "10px"
    },
    img: {
        height: "inherit",
        maxWidth: "inherit",
    },
    input: {
        display: "none"
    }
}));

function AddPhoto({ setUrl }) {

    const [source, setSource] = useState("");
    const [file, setFile] = useState(null);

    const { currentUser } = useAuth();
    const classes = useStyles();

    const handleCapture = (target) => {
        if (target.files) {
            if (target.files.length !== 0) {
                const uploadFile = target.files[0];
                //console.log(`upload file = ${uploadFile.name}`);
                setFile(uploadFile);
                const newUrl = URL.createObjectURL(uploadFile);
                setSource(newUrl);
            }
        }
    };

    return (
        <>
            <Card>
                <Card.Body>
                    {source && <Image src={source} alt={"snap"} fluid />}
                    <input
                        accept="image/*"
                        className={classes.input}
                        id="icon-button-file"
                        type="file"
                        capture="environment"
                        onChange={(e) => handleCapture(e.target)}
                    />

                    <label htmlFor="icon-button-file">
                        <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                        >
                            <PhotoCameraRoundedIcon className="w-100 mt-2 text-center" fontSize="large" color="primary" />
                        </IconButton>
                    </label>

                    <div className="w-100 mt-2 text-center">
                        {file && <ProgressBar currentUser={currentUser} file={file} setFile={setFile} setUrl={setUrl} />}
                    </div>
                </Card.Body>
            </Card>
        </>
    );
}

export default AddPhoto;