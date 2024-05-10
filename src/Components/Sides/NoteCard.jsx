import {useState, useContext} from 'react';
import styles from './NoteCard.module.css';
import { AuthContext } from '../../Contexts/AuthContextProvider';
import { db } from '../../Firebase';
import { deleteDoc, doc } from 'firebase/firestore';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { MoreHorizOutlined, Delete} from '@mui/icons-material';

const NoteCard = ({ title, content, timestamp, label, id }) => {
    const data = useContext(AuthContext)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClose = () => {
        setAnchorEl(null);
    }
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const deleteNote = async () => {
        await deleteDoc(doc(db, "users", data.email, "notes", id))
        setAnchorEl(null);

    }
    return (
        <div className={styles.noteContainer}>
            <div className={styles.contentContainer}>
                <h6>{timestamp?.toDate().toLocaleString('fa-IR', {weekday: 'long', year: 'numeric' ,month: 'numeric', day: 'numeric'})}</h6>
                <h5>{title}</h5>
                <p>{content}</p>
            </div>
            <div className={styles.footerContainer}>
                <span className={label === 'Personal' ? styles.personalLabel : label === 'Work' ? styles.workLabel : label === 'Family' ? styles.familyLabel : null}>{label}</span>
                <IconButton className={styles.moreBtn}
                    id='more2-button'
                       aria-controls={open ? 'more2-button' : undefined}
                       aria-haspopup='true'
                       aria-expanded={open ? 'true' : undefined}
                       onClick={handleClick}
                       >
                           <MoreHorizOutlined />
                    </IconButton>
                    <Menu
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
                        <MenuItem onClick={deleteNote}>
                        <Delete sx={{color: 'grey', fontSize: 20, marginRight: '10px'}} />
                            Remove Note</MenuItem>
                    </Menu>
            </div>
        </div>
    );
};

export default NoteCard;