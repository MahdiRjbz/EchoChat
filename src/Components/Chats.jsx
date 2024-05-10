import { useParams } from 'react-router-dom';
import styles from './Chats.module.css';
import {ChatList} from './ChatEngine/ChatList';
import ChatFeed from './ChatEngine/ChatFeed';
import Welcome from './ChatEngine/Welcome';
import { isMobile } from 'react-device-detect';

const Chats = () => {
    const id = useParams();
    
    const renderChatlist = () => {
        if (isMobile) {
            return Object.keys(id).length === 0 ? <ChatList /> : undefined
        } else {
            return <ChatList />
        } 
    }
    
    const render = () => {
        if (isMobile) {
           return Object.keys(id).length ? <ChatFeed /> : undefined
        } else {
            return Object.keys(id).length ? <ChatFeed /> : <Welcome />
        }
    }
    
    return (
        <div className={styles.container}>
            {renderChatlist()}
            {render()}
        </div>
    );
};

export default Chats;