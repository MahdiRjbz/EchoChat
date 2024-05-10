import {useContext} from 'react';
import styles from './Users.module.css'
import { db } from '../../Firebase';
import { collection } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { AuthContext } from '../../Contexts/AuthContextProvider';

const Users = () => {
    const user = useContext(AuthContext);
    function obscureString(str, numChars) {
        const obscuredPart = str?.slice(numChars).padStart(str.length, '*');
        return obscuredPart;
      }

    const userCol = collection(db, "users");
    const [users, , ,] = useCollectionData(userCol);
    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <div className={styles.titleDiv}>
                    <h1>Users</h1>
                    <h4>Logged in Users In EchoChat</h4>
                </div>
                <div className={styles.Body}>
                {users ? users.map((item) => 
                    <div key={item.id} className={styles.userCard}>
                        <div className={styles.profileDiv}>
                            <img src={item.photoURL} alt={item.name} />
                        </div>
                        <div className={styles.nameDiv}>
                            <h4>Name: {item.name}</h4>
                            <h5>Email: {user.email === item.email ? item.email : obscureString(item?.email, 5)}</h5>
                        </div>
                    </div>
                ) : null}
                </div>
            </div>  
        </div>
    );
};

export default Users;