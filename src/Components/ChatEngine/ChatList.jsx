import {useState} from 'react';
import { useQuery } from '@tanstack/react-query';
import styles from './ChatList.module.css'
import {db} from '../../Firebase';
import {collection, getDocs } from 'firebase/firestore';
import ChatListHeader from './ChatListHeader';
import ChatListCard from './ChatListCard';
import Loading from '../Loading/Loading';

const ChatList = () => {
    const [search, setSearch] = useState('');
    const getrooms = async () => {
        const roomCollectionRef = await getDocs(collection(db, "rooms"))
            return roomCollectionRef.docs.map((doc) => ({
                    name: doc.data().name,
                    id: doc.id,
                }))
        }
    const { data } = useQuery({queryKey: ['rooms'], queryFn: getrooms, gcTime: 1000, staleTime: 1, refetchInterval: 1000})
    const filteredRooms =
    data?.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))

    return (
        <div className={styles.mainContainer}>
            <ChatListHeader search={search} setSearch={setSearch}  title='Chats' />
                <div className={styles.container}>
                    {filteredRooms ? filteredRooms?.map(item => 

                        <ChatListCard key={item.id} name={item.name} id={item.id} />
                    
                    )  : <Loading /> }
                    
                </div>
            
        </div>
    );
};

export {ChatList};