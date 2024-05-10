import { useLocation, Link } from 'react-router-dom';
import styles from './Navbar.module.css'
import { AccountCircleOutlined ,Translate, AssignmentTurnedInOutlined, ForumOutlined, GroupOutlined } from '@mui/icons-material';
import { isMobile } from 'react-device-detect';

const Navbar = () => {
    const location = useLocation();
    return (
        location.pathname === '/' ? null :
        <div className={styles.navbar}>
            <div className={styles.logoDiv}>
                <img src="/Assets/Home-logo.svg" alt="EchoChat-favicon" />
            </div>
            <div className={styles.buttonDiv}>
                <Link to='/chats'>
                    <button>
                        <ForumOutlined className={location.pathname.includes('chats') ? styles.active : styles.icon}/>
                    </button>
                </Link>
                <Link to='/users'>
                    <button >
                        <GroupOutlined className={location.pathname.includes('users') ? styles.active : styles.icon} />
                    </button>
                </Link>
                <Link style={isMobile ? {display: 'block' } : {display: 'none'}} to='/translator'>
                    <button>
                        <Translate className={location.pathname.includes('translator') ? styles.active : styles.icon} />
                    </button>
                </Link>
                <Link style={isMobile ? {display: 'block' } : {display: 'none'}} to='/note'>
                    <button>
                        <AssignmentTurnedInOutlined className={location.pathname.includes('note') ? styles.active : styles.icon} />
                    </button>
                </Link>
                <Link to='/profile'>
                    <button>
                        <AccountCircleOutlined className={location.pathname.includes('profile') ? styles.active : styles.icon} />
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Navbar;