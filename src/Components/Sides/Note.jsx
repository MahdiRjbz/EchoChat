import { useState, useContext } from 'react';
import styles from './Note.module.css';
import { AuthContext } from '../../Contexts/AuthContextProvider';
import { v4 as uuidv4 } from 'uuid';
import { MenuItem, TextareaAutosize, TextField, Button ,IconButton, OutlinedInput, FormControl, InputLabel, Select } from '@mui/material';
import { Close } from '@mui/icons-material';
import { collection, setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from '../../Firebase';
import NoteCard from './NoteCard';
import Loading from '../Loading/Loading';
import { LoadingButton } from '@mui/lab';

const Note = ({ setActive }) => {
    const data = useContext(AuthContext);
    const [loading, setLoading] = useState(false)
    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState('');
    const [newNote, setNewNote] = useState(false);
    const [newNoteValues, setNewNoteValues] = useState({
        title: '',
        content: '',
        label: 'Personal',
    });

    const colRef = collection(db, "users", data.email, "notes");
    const [values, loading1, , ] = useCollectionData(colRef);

    const handleChange = (event) => {
        setFilter(event.target.value);
      };
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setNewNoteValues({
            ...newNoteValues,
            [name]: value,
        })
      }
    console.log(values?.length)
    const renderContent = () => {
        if (loading1) {
            return <Loading />
        } else if (values.length > 0) {
            return filteredNotes.map((item) => <NoteCard key={item.id} id={item.id} title={item.title} content={item.content} timestamp={item.timestamp} label={item.label}/>)
        } else if (loading1 !== true && values.length === 0) {
            return <p>No Notes Available!</p>
        }
    }    
    const filteredNotes = values?.filter((item) => {
        if (filter === 'All') return true;
        return item.label === filter;
    }).filter(item => item.title.toLowerCase().includes(search.toLowerCase()));
    


    const addHandler = async () => {
        const id = uuidv4();
        setLoading(true)
        const colRef = collection(db, "users", data.email, "notes")
        if (newNoteValues.title.length > 0 && newNoteValues.content.length > 0) {
            await setDoc(doc(colRef, id), {
                title: newNoteValues.title,
                content: newNoteValues.content,
                label: newNoteValues.label,
                timestamp: serverTimestamp(),
                id: id    
            }).then(() => {
                setLoading(false)
                setNewNote(false)
            })
        }
    }
    return (
        <div className={styles.container}>
            <div className={styles.titleDiv}>
                <h3>Notes</h3>
                <IconButton onClick={() => setActive('')}>
                    <Close />
                </IconButton>
            </div>
            <div className={styles.inputsContainer}>
                    <FormControl fullWidth sx={{display: 'grid', gridTemplateColumns: 'auto auto', columnGap: '.5rem'}}>
                        <InputLabel id="demo-simple-select-label">Filter</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        size='small'
                        value={filter}
                        label="Filter"
                        onChange={handleChange}
                        >
                        <MenuItem value={'All'}>All Notes</MenuItem>
                        <MenuItem value={'Personal'}>Personal</MenuItem>
                        <MenuItem value={'Family'}>Family</MenuItem>
                        <MenuItem value={'Work'}>Work</MenuItem>
                        </Select>
                    </FormControl>
                        <OutlinedInput placeholder='Search in Notes' value={search} onChange={(e) => setSearch(e.target.value)} size='small' />
            </div>
            <div className={styles.contentContainer}>
                <div className={styles.noteDiv}>
                    {renderContent()}
                </div>
            </div>
            <div className={styles.mainButtonContainer}>
                <div className={styles.buttonContainer}>
                    <Button sx={{width: '100%', backgroundColor: '#463cff'}} variant="contained" onClick={() => setNewNote(true)}>Add Note</Button>
                </div>
            </div>
            
            {newNote ? 
                <div className={styles.newNoteWrapper}>
                    <div className={styles.newNoteContainer}>
                        <div className={styles.newNoteTitleDiv}>
                            <h3>Add New Note</h3>
                            <IconButton onClick={() => setNewNote(false)}>
                                <Close />
                            </IconButton>
                        </div>
                        <div className={styles.newNoteInputContainer}>
                            <div className={styles.inputsDiv}>
                                <label htmlFor='title'>Note Title:</label>
                                <TextField placeholder='Add Note Title Here' inputProps={{style: {fontFamily: 'arant-regular'}}} sx={{width: '100%'}} size='small' name='title' value={newNoteValues.title} onChange={handleInputChange}/>
                            </div>
                            <div className={styles.inputsDiv}>
                                <label htmlFor='content'>Note Details:</label>
                                <TextareaAutosize
                                    minRows={6}
                                    aria-label="maximum height"
                                    className={styles.input1}
                                    name='content'
                                    value={newNoteValues.content}
                                    onChange={handleInputChange}
                                    placeholder='Add Note Description Here'
                                />
                            </div>
                            <FormControl fullWidth sx={{display: 'grid', gridTemplateColumns: 'auto',gridTemplateRows: 'auto auto', columnGap: '.5rem'}}>
                                <label htmlFor="label">Note Tag:</label>
                                <InputLabel id="demo-simple-select-label"></InputLabel>
                                <Select
                                    name='label'
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    size='small'
                                    value={newNoteValues.label}
                                    onChange={handleInputChange}
                                    >
                                    <MenuItem value={'Personal'}>Personal</MenuItem>
                                    <MenuItem value={'Family'}>Family</MenuItem>
                                    <MenuItem value={'Work'}>Work</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className={styles.newNoteButtonContainer}>
                        <Button  sx={{ backgroundColor: 'whiteSmoke', color: 'black'}} variant="contained" onClick={() => setNewNote(false)}>Close</Button>
                        <LoadingButton color='primary' loadingPosition='center' loading={loading} sx={{backgroundColor: '#463cff'}} variant="contained" onClick={addHandler}>
                            Add Note
                        </LoadingButton>
                        </div>
                    </div>
                </div>
            : null}
        </div>
    );
};

export default Note;