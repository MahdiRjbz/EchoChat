import { useState, useContext } from 'react';
import { serverTimestamp, doc, setDoc} from 'firebase/firestore';
import { db } from '../../Firebase';
import { v4 as uuidv4 } from 'uuid';
import { TextField, IconButton, CircularProgress, Box, Typography } from '@mui/material';
import { Send } from '@mui/icons-material';
import styles from './ChatForm.module.css';
import { AuthContext } from '../../Contexts/AuthContextProvider';
import { isMobile } from 'react-device-detect';
import { franc } from 'franc';


const ChatForm = ({ roomId }) => {
    const user = useContext(AuthContext)
    const [value, setValue] = useState("");
    const [detectedLang, setDetectedLang] = useState("");
    let inputProgress = 0;
    let remainChar = 100;

    const submitHandler = async () => {
        const id = uuidv4();
        
        if (value && value.trim().length > 0) {
            setValue("")
            const multiline = value.split('\n');
            const docRef = doc(db, "rooms", roomId, "messages", id)
            await setDoc(docRef, {
                message: multiline,
                name: user.displayName,
                email: user.email,
                timestamp: serverTimestamp(),
                photoURL: user.photoURL,
                id: id  
            })
        }
    }

    const enterHandler = (event) => {
        
        if (event.key === 'Enter' && event.shiftKey) {
            event.preventDefault();
      
            const { selectionStart, selectionEnd } = event.target;
            const value = event.target.value;
            const updatedValue =
              value.substring(0, selectionStart) + '\n' + value.substring(selectionEnd);
      
            setTimeout(() => {
              setValue(updatedValue);
            }, 0);
          } else if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            submitHandler()
          } else if (event.key === 'click') {
            event.preventDefault();
            submitHandler()
          }



    }

    const changeHandler = (event) => {
        const inputText = event.target.value;
        setValue(inputText)
        setDetectedLang(franc(inputText.charAt(0), {minLength: 0, only: ['pes', 'eng']}))
    }
    return (
        <form className={styles.container}>
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <CircularProgress sx={{color: value.length === 100 ? "red" : "#463cff"}}  variant='determinate' value={inputProgress + value.length} />
                <Box
                    sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    }}
                >
                    <Typography fontSize={15} variant="caption" component="div" color={value.length === 100 ? "red" : "#463cff"}>
                        {remainChar - value.length}
                    </Typography>
                </Box>
            </Box>
            <TextField multiline inputProps={{style: {fontFamily: 'arant-regular',  direction: detectedLang === 'pes' ? 'rtl' : 'ltr'}, maxLength: 100,  }} value={value} sx={{ fontFamily: 'arant-regular', fontSize: '3rem' }} onKeyDown={enterHandler} maxRows={2} autoComplete="off" onChange={changeHandler} size='small' className={styles.input} placeholder='Say Somthing...' />
            <IconButton size='small' type='button' onClick={submitHandler} className={styles.sendButton} sx={isMobile ? {borderRadius: '5px', width: '45px' ,backgroundColor: '#665DFE', color: 'white', padding: '1rem'} : {backgroundColor: '#665DFE', color: 'white', padding: '1rem', width: '45px', height: '45px'}}>
                <Send fontSize='small' />
            </IconButton>
        </form>
    );
};

export default ChatForm;