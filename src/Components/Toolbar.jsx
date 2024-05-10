import { useState } from 'react';
import styles from './Toolbar.module.css'
import { GridViewOutlined, Translate, EventNote } from '@mui/icons-material';
import Translator from './Sides/Translator';
import Note from './Sides/Note';

const Toolbar = () => {
    const [active, setActive] =  useState('');

    return (
        location.pathname === '/' ? null :
        <div className={styles.toolbar}>
            <div className={styles.titleDiv}>
                Apps
                <GridViewOutlined />
            </div>
            <div className={styles.buttonsContainer}>
                <button onClick={() => setActive('translator')} className={active === 'translator' ? styles.openButton : undefined}>
                    <Translate sx={{color: active === 'translator' ? '#463cff' : undefined}} />
                </button>
                <button onClick={() => setActive('note')} className={active === 'note' ? styles.openButton : undefined}>
                    <EventNote sx={{color: active === 'note' ? '#463cff' : undefined}} />
                </button>
            </div>
            {active === 'translator' ? <Translator active={active} setActive={setActive} /> : null }
            {active === 'note' ? <Note active={active} setActive={setActive} /> : null }
        </div>
    );
};

export default Toolbar;