import {useState} from 'react';
import styles from './ChatListHeader.module.css';
import { MoreHorizOutlined, AddOutlined, Search, Close } from '@mui/icons-material';
import { Box, Menu, IconButton, Button, MenuItem, TextField, InputAdornment} from '@mui/material';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../Firebase';

const ChatListHeader = ({ title, search, setSearch }) => {

    const [value, setValue] = useState('');
    const [newRoom, setNewRoom] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    
    const handleClose = () => {
        setAnchorEl(null);
    }
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const addHandler = () => {
        if (value) {
            const roomCollRef = collection(db, 'rooms');
            addDoc(roomCollRef, { name: value })
                .then(response => {console.log(response)})
                .catch(error => {console.log(error.message)});
        }
        setValue('')
        setNewRoom(false)
        
    }
    

    return (
        <div className={styles.container}>
            <div className={styles.titleDiv}>
                <h1>{title}</h1>
                <div>
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
                        <MenuItem onClick={() => {setNewRoom(true), setAnchorEl(null)}}>
                        <AddOutlined sx={{color: 'grey', fontSize: 20, marginRight: '10px'}} />
                            New Group</MenuItem>

                    </Menu>
                </div>
            </div>
            <div className={styles.inputsDiv}>
                <Box component='form' autoComplete='off' sx={{width: '100%', height: '2rem', backgroundColor: '', }}>
                    <TextField fullWidth value={search} onChange={(e) => setSearch(e.target.value)} sx={{display: 'flex', }} label='Search Rooms' id='searchRooms' size='small' InputLabelProps={{ sx: { fontSize: '0.9rem', marginTop: '1.5px' } }} InputProps={{
                        endAdornment: (
                            <InputAdornment position='end'>
                                <Search />
                            </InputAdornment>
                        ),
                    }} />
                </Box>
            </div>
            {newRoom ?
                <div className={styles.newModalWrapper}>
                    <div className={styles.newModalContainer}>
                        <div className={styles.newModalHeader}>
                            <h3>Add New Room</h3>
                            <IconButton onClick={() => setNewRoom(false)}>
                                <Close />
                            </IconButton>
                        </div>
                        <div className={styles.newModalInputDiv}>
                            <label htmlFor='name'>Room Name:</label>
                            <TextField placeholder='Add Room Name Here' inputProps={{style: {fontFamily: 'arant-regular'}}} sx={{width: '100%', fontFamily: 'arant-regular'}} size='small' name='name' value={value} onChange={(e) => setValue(e.target.value)}/>
                        </div>
                        <div className={styles.buttonDiv}>
                            <Button  sx={{ backgroundColor: 'whiteSmoke', color: 'black'}} variant="contained" onClick={() => {setNewRoom(false), setValue('')}}>Close</Button>
                            <Button sx={{ backgroundColor: '#463cff'}} variant="contained" onClick={addHandler}>Create Room</Button>
                        </div>
                    </div>
                </div>
            
            : null}
        </div>
    );
    
};

export default ChatListHeader;