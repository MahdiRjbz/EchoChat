import Navbar from '../Components/Navbar';
import Toolbar from '../Components/Toolbar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    
    return (
    <div className='pageContainer'>
        <Navbar />
        <Toolbar />   
        <Outlet />
    </div>
        
    );
};

export default Layout;