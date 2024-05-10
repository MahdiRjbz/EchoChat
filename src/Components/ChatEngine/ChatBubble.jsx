import { useContext,  useEffect,  useState } from 'react';
import styles from './ChatFeed.module.css'
import { AuthContext } from '../../Contexts/AuthContextProvider';
import { Button, Menu, IconButton, MenuItem, MenuList, TextField } from '@mui/material';
import { ContentCopy, Edit, Delete, MoreHorizOutlined, Close } from '@mui/icons-material';
import { db } from '../../Firebase';
import { updateDoc, doc, deleteDoc } from 'firebase/firestore';
import Linkify from 'linkify-react'
import { isMobile } from 'react-device-detect';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { modifyTimestamp } from '../../Helper/Functions';
import { franc } from 'franc';

const ChatBubble = ({ message, name, email, photoURL, timestamp, id, roomId }) => {
    const user = useContext(AuthContext);
    const [isEdit, setIsEdit] = useState(false);
    const [onInfo, setOnInfo] = useState(false);
    const [modifiedMeesage, setModifiedMessage] = useState("");
    const [detectedLang, setDetectedLang] = useState("");
    const [editText, setEditText] =useState(message);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    useEffect(() => {
        if (Array.isArray(message)) {
            setModifiedMessage(message.join('\n'))
        } else {
            setModifiedMessage(message)
        }
        setDetectedLang(franc(modifiedMeesage.charAt(0), {minLength: 1, only: ['pes', 'eng']}))
        
        
    }, [message, modifiedMeesage])


    const handleClose = () => {
        setAnchorEl(null);
    }
    const DeleteHandleClose = async () => {
        await deleteDoc(doc(db, "rooms", roomId, "messages", id))
        toast.success("Message Deleted Successfully")
        setAnchorEl(null);
    };
    const copyHandleClose = () => {
        navigator.clipboard.writeText(message).then(() => {
            toast.success("Message Copied Successfully")
        });
        setAnchorEl(null);
    };
    const updateMessage = () => {
        setEditText(message);
        if (editText !== message) {
            const docRef = doc(db, "rooms", roomId, "messages", id)
            const editData = { message: editText }
            updateDoc(docRef, editData)
            .then(() => {
                toast.success("Message Updated Successfully")
            })
            .catch((error) => {
                toast.error(error)
            });
        }
        setIsEdit(false);
        setEditText(message);

    }
    return (
        <div className={name === user.displayName ? styles.userChatBubbleContainer : styles.chatBubbleContainer}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <div className={styles.chatBubbleDiv}>
                    <pre dir={detectedLang === 'pes' ? 'rtl' : 'ltr' } className={styles.messageText} style={{display: isEdit ? 'none' : 'block'}}>
                        <Linkify options={{target: "_blank"}}>
                            {modifiedMeesage}
                        </Linkify>
                    </pre>
                    <TextField inputProps={{style: {padding: '6px 7px', fontFamily: 'arant-regular',}}} hiddenLabel size='small' sx={{fontFamily: 'arant-regular' ,display: isEdit ? 'block' : 'none', backgroundColor: 'whitesmoke', width: 'max-content', borderRadius: '5px', borderColor: 'grey',}} value={editText} onChange={(e) => {setEditText(e.target.value)}} />
                    <div onClick={() => setOnInfo(true)} className={styles.imageDiv}>
                        <img className={styles.profile} onError={event => {
                                event.target.src = "/Assets/profile(Medium).png"
                                event.onerror = null
                            }} src={photoURL} alt="profile-picture" />
                    </div>
                </div>
                <div className={styles.moreDiv}>
                    <span>{modifyTimestamp(timestamp)}</span>
                    <div className={styles.moreButtonDiv}>
                        <IconButton
                           sx={{fontSize: '0.1rem', width: '1.3rem', height: '1.3rem'}} 
                           id='more-button'
                           size='small'
                           aria-controls={open ? 'more-button' : undefined}
                           aria-haspopup='true'
                           aria-expanded={open ? 'true' : undefined}
                           onClick={handleClick}
                           >
                               <MoreHorizOutlined sx={isMobile ? {fontSize: '1rem'} : {fontSize: '1.3rem'}} />
                       </IconButton>
                
                               <Menu
                
                                   id='more-menu'
                                   anchorEl={anchorEl}
                                   open={open}
                                   onClose={handleClose}
                                   MenuListProps={{
                                   'aria-labelledby': 'more-button',
                                   }}
                                   anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left'
                                   }}
                                   transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center'
                                   }}
                                >
                
                                    <MenuList sx={isMobile ? {width: 130} : {width: 150, padding: '4px'}}>
                                        <MenuItem sx={{padding: '.3rem .5rem', fontSize: '.9rem'}} onClick={copyHandleClose}>
                                            <ContentCopy sx={isMobile ? {color: 'grey', marginRight: '12px', fontSize: '1.1rem'} : {color: 'grey', fontSize: 20, marginRight: '10px'}} />
                                            Copy</MenuItem>
                                        <MenuItem sx={{display: user.email === email ? undefined : 'none', padding: '.3rem .5rem', fontSize: '.9rem'}} onClick={() => {
                                            setAnchorEl(null);
                                            setIsEdit(true)
                                            setEditText(message)
                                        }}>
                                            <Edit sx={isMobile ? {color: 'grey', marginRight: '12px', fontSize: '1.1rem'} : {color: 'grey', fontSize: 20, marginRight: '10px'}} />
                                            Edit</MenuItem>
                                        <MenuItem sx={{display: user.email === email ? undefined : 'none', padding: '.3rem .5rem', fontSize: '.9rem'}} onClick={DeleteHandleClose}>
                                        <Delete sx={isMobile ? {color: 'grey', marginRight: '12px', fontSize: '1.1rem'} : {color: 'grey', fontSize: 20, marginRight: '10px'}} />
                                            Delete</MenuItem>
                                    </MenuList>
                               </Menu>
                    </div>
                    {isEdit ? <Button size='small' sx={{backgroundColor: 'white', color: 'black', border: 'solid 0.5px #665DFE', ":hover": {backgroundColor: 'whitesmoke'}}} onClick={updateMessage} variant='contained'>
                        FINISH
                    </Button> : null}
                
            </div></div>
            
            <div style={{display: onInfo ? 'flex' : 'none'}} className={styles.personalInfoContainer}>
                <div className={styles.personalInfoDivC} >
                    <div className={styles.headContainer}>
                        <h2>Sender Info</h2>
                        <IconButton onClick={() => setOnInfo(false)}>
                            <Close />
                        </IconButton>
                    </div>
                    <span></span>
                    <div className={styles.personalImageDiv}>
                        <img src={photoURL}  alt="profile" />
                    </div>
                    <div className={styles.personalInfoDiv}>
                        <div className={styles.infoLabelContainer}>
                            <div className={styles.nameDiv} style={{gridArea: 'name'}}>
                                <h6>Name:</h6>
                                <h5>{name.split(' ')[0]}</h5>
                            </div>
                            <div className={styles.lastNameDiv} style={{gridArea: 'lastName'}}>
                                <h6>LastName:</h6>
                                <h5>{name.split(' ')[1]}</h5>
                            </div>
                            <div className={styles.emailDiv} style={{gridArea: 'email'}}>
                                <h6>Email:</h6>
                                <h5>{email}</h5>
                            </div>
                            <div className={styles.messageDiv}>
                                <h6>Message:</h6>
                                <h5 dir={detectedLang === 'pes' ? 'rtl' : 'ltr' } >{message}</h5>
                            </div>
                        </div>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatBubble;