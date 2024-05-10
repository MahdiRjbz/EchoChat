import { useEffect, useState } from 'react';
import styles from './ChatListCard.module.css';
import { useParams } from 'react-router-dom';
import { collection, query, orderBy } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Link } from 'react-router-dom';
import { db } from '../../Firebase';
import { modifyTimestamp } from '../../Helper/Functions';
import { franc } from 'franc';

const ChatListCard = ({ id, name }) => {
    const [lastmessage, setLastMessage] = useState({});
    const [detectedLang, setDetectedLang] = useState("");
    const [modifiedMeesage, setModifiedMessage] = useState("");
    const { roomId } = useParams();
    const messageCol = collection(db, "rooms", id, "messages");
    const q = query(messageCol, orderBy("timestamp", "asc"));
    const [values, loading , ,] = useCollectionData(q);


    useEffect(() => {
        values ? setLastMessage(values[values.length - 1]) : null;
        loading ? setModifiedMessage('Wait...') : null

        if (lastmessage) {
            if (Array.isArray(lastmessage.message)) {
                setModifiedMessage(lastmessage.message.join('\n'))
            } else {
                setModifiedMessage(lastmessage.message)
            }
            
        }
            if (modifiedMeesage) {
                setDetectedLang(franc(modifiedMeesage.charAt(0), {minLength: 0, only: ['pes', 'eng']}))

            }

    }, [lastmessage, modifiedMeesage, values, loading])
    
    return (
        <Link style={{color: 'black'}} to={`/chats/${id}`}>
            <div className={roomId === id ? styles.activeChatCardContainer : styles.chatCardContainer}>
                <div className={styles.descContainer}>
                    <div className={styles.titleDiv}>
                        <h2>{name}</h2>
                        <h6>{lastmessage ? modifyTimestamp(lastmessage?.timestamp) : 'No Message Yet!'}</h6>
                    </div>
                    <div className={styles.lastDiv}>
                        <p dir={detectedLang === 'pes' ? 'rtl' : 'ltr'} >{lastmessage ? modifiedMeesage : 'Talk With Your Friends'}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ChatListCard;