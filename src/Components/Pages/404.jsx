import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return (
        <div>
            <div>
                <h1>404</h1>
                <h2>Page Not Found</h2>
            </div>
            <div>
                <Link to={'/chats'} >
                    <Button>
                       Go to Chats 
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default PageNotFound;