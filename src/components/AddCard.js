import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PhotoCameraRoundedIcon from "@material-ui/icons/PhotoCameraRounded";
import { Link, useHistory } from 'react-router-dom';
import ProgressBar from './ProgressBar';
import { useAuth } from '../contexts/AuthContext';

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

function AddCard() {
    const classes = useStyles();
    const [source, setSource] = useState("");
    const [file, setFile] = useState(null);

    const { currentUser } = useAuth();

    const handleCapture = (target) => {
        if (target.files) {
            if (target.files.length !== 0) {
                const uploadFile = target.files[0];
                console.log(`upload file = ${uploadFile.name}`);
                setFile(uploadFile);
                const newUrl = URL.createObjectURL(uploadFile);
                setSource(newUrl);
            }
        }
    };

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={12}>
                    <h5>Capture your image</h5>
                    {source &&
                        <Box display="flex" justifyContent="center" border={1} className={classes.imgBox}>
                            <img src={source} alt={"snap"} className={classes.img}></img>
                        </Box>}
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
                            <PhotoCameraRoundedIcon fontSize="large" color="primary" />
                        </IconButton>
                    </label>
                </Grid>
            </Grid>
            <div className="w-100 mt-2 text-center">
                {file && <ProgressBar currentUser={currentUser}  file={file} setFile={setFile} />}
                <Link to='/'>Home</Link>
            </div>
        </div>
    );
}

export default AddCard;