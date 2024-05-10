import {useState} from 'react';
import styles from './ChatFeedHeader.module.css'
import { deleteDoc, doc } from 'firebase/firestore';
import { IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import { MoreHorizOutlined, Delete, ArrowBack } from '@mui/icons-material';
import { db } from '../../Firebase';
import { useNavigate } from 'react-router-dom';
import { isMobile } from 'react-device-detect';

const ChatFeedHeader = ({ title, last, roomId }) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    let lastSeen = "";
    if (last.length > 0) {
        lastSeen = last[last?.length - 1]?.timestamp ? new Date(last[last.length - 1]?.timestamp?.toDate()).toLocaleString('fa-IR').slice(0, -3) : 'Wait...';
    } else {
        lastSeen = 'None'
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    }

    const deleteGroup = async () => {
        await deleteDoc(doc(db, "rooms", roomId))
        navigate("/chats");
        setAnchorEl(null);
    }
    
    return (
        <div className={styles.container}>
            <div>
                <IconButton onClick={() => navigate('/chats')}>
                    <ArrowBack />
                </IconButton>
            </div>
            <div className={styles.avatarDiv}>
                <Avatar sx={isMobile ? {width: '2rem', height: '2rem'} : {undefined}}>{title?.slice(0,1)}</Avatar>
            </div>
            <div className={styles.nameDiv}>
                <h2>{title}</h2>
                <h3>{`Last Activity: ${lastSeen}`}</h3>
            </div>
            <div className={styles.buttonDiv}>
                <IconButton sx={{fontSize: '1.2rem'}} size={isMobile ? 'small' : undefined} className={styles.moreBtn}
                    id='more2-button'
                       aria-controls={open ? 'more2-button' : undefined}
                       aria-haspopup='true'
                       aria-expanded={open ? 'true' : undefined}
                       onClick={handleClick}
                       >
                           <MoreHorizOutlined sx={isMobile ? {fontSize: '1.2rem'} : {undefined}} />
                           
                    </IconButton>
                    <Menu
                        sx={{padding: '.5rem'}}
                        id='more2-button'
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                        'aria-labelledby': 'more2-button',
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
                        <MenuItem sx={{padding: '.3rem .5rem', fontSize: '.9rem'}} onClick={deleteGroup}>
                        <Delete sx={{color: 'grey', fontSize: '1.1rem', marginRight: '10px'}} />
                            Delete Group</MenuItem>
                        
                    </Menu>
            </div>
        </div>
    );
};

export default ChatFeedHeader;