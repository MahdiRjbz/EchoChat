import {useState, useEffect} from 'react';
import axios from 'axios';
import styles from './TranslatorMobile.module.css'
import { Select, MenuItem, FormControl, TextareaAutosize } from '@mui/material';
import { East } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';

const TranslatorMobile = () => {
    const [loading, setLoading] = useState(false)
    const [lang1, setLang1] = useState('en');
    const [lang2, setLang2] = useState('fa');
    const [text, setText] = useState('');
    const [translated, setTranslated] = useState('');

    const translateF = async () => {
        setLoading(true)
        axios.get(`https://api.mymemory.translated.net/get?q=${text}!&langpair=${lang1}|${lang2}`, {
        }).then(response => {
            setTranslated(response.data.responseData.translatedText)
            setLoading(false)
        })
        
    }
    useEffect (() => {
        getText();

    }, [])
    const getText = () => {
        localStorage.getItem('text') ? setText(localStorage.getItem('text')) : null
    }
    const saveText = () => {
        localStorage.setItem('text', text);
    }


    return (
        <div className={styles.container}>
            <div className={styles.titleDiv}>
                <h1>Translator</h1>
                <h4>Simple Translating Service</h4>
            </div>
            <div className={styles.contentContainer}>
                <div className={styles.inputsContainer}>
                    <div className={styles.langDiv}>
                        <FormControl sx={{minWidth: 150, backgroundColor: 'white'}} size='small'>
                            <Select value={lang1} defaultValue={'English'} displayEmpty onChange={(e) => setLang1(e.target.value)}>
                                <MenuItem value={'fa'}>Persian</MenuItem>
                                <MenuItem value={'en'}>English</MenuItem>
                            </Select>
                        </FormControl>
                        <East sx={{width: '1rem'}} />
                        <FormControl sx={{minWidth: 150, backgroundColor: 'white'}} size='small'>
                            <Select value={lang2} defaultValue={'Persian'} displayEmpty onChange={(e) => setLang2(e.target.value)}>
                                <MenuItem value={'fa'}>Persian</MenuItem>
                                <MenuItem value={'en'}>English</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className={styles.txtFieldContainer}>
                        <TextareaAutosize
                            minRows={6}
                            aria-label="maximum height"
                            className={styles.input1}
                            onChange={(e) => setText(e.target.value)}
                            onKeyUp={saveText}
                            value={text}
                            placeholder='Type to Translate...'
                            autoFocus
                        />
                        <TextareaAutosize
                            minRows={6}
                            aria-label="maximum height"
                            readOnly
                            className={styles.input2}
                            value={translated}
                        />
                    </div>
                </div>
                <div className={styles.buttonContainer}>
                    <LoadingButton color='primary' loadingPosition='center' loading={loading} sx={{width: '100%', backgroundColor: '#463cff'}} variant="contained" onClick={translateF.bind(lang1, lang2)}>
                        Translate
                    </LoadingButton>
                </div>
            </div>
        </div>
    );
};

export default TranslatorMobile;