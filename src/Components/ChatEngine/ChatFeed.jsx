import { useEffect, useRef } from 'react';
import styles  from './ChatFeed.module.css'
import {query, orderBy, collection, doc } from 'firebase/firestore';
import {useCollectionData, useDocumentData} from 'react-firebase-hooks/firestore'
import ChatFeedHeader from './ChatFeedHeader';
import ChatForm from './ChatForm';
import { useParams } from 'react-router-dom';
import { db } from '../../Firebase';
import ChatBubble from './ChatBubble';
import Loading from '../Loading/Loading';
import { ToastContainer } from 'react-toastify';


const ChatFeed = () => {
    const { roomId } = useParams();
    const colRef = collection(db, "rooms", roomId, "messages");
    const q = query(colRef, orderBy("timestamp", "asc"));
    const [ values, , ,  ] = useCollectionData(q);
    const roomSnap = doc(db, "rooms", roomId);
    const [ values1 , , , ] = useDocumentData(roomSnap);
    const divRef = useRef(null);

    useEffect(() => {
        divRef.current?.scrollIntoView({ behavior: 'smooth' });
    });
    
    return ( 
        <div className={styles.container}>
            <ChatFeedHeader roomId={roomId} title={values1?.name} last={values ? values : false} />
            <div className={styles.chatFeedContainer}>
                <div className={styles.chatsContainer}>
                        {values ? values?.map((item) => 
                                <ChatBubble key={item.id} timestamp={item.timestamp} name={item.name} message={item.message} photoURL={item.photoURL} email={item.email ? item.email : 'Unknown'} id={item.id} roomId={roomId} item={item} />  
                        )
                        : 
                            <Loading />
                        }     
                </div>
                <div ref={divRef} className={styles.anchor}></div>        
            </div>
            <ChatForm roomId={roomId}  />
            <ToastContainer
                autoClose={1000}
                limit={1}
                newestOnTop={false}
                
            >
            </ToastContainer>
        </div>
    );
};

export default ChatFeed;