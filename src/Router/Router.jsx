import { Routes, Route } from 'react-router-dom';
import Layout from '../Layouts/Layout';
import Login from '../Components/Login';
import Profile from '../Components/Pages/Profile';
import Chats from '../Components/Chats';
import PageNotFound from '../Components/Pages/404';
import TranslatorMobile from '../Components/Pages/TranslatorMobile';
import NoteMobile from '../Components/Pages/NoteMobile';
import Welcome from '../Components/ChatEngine/Welcome';
import Users from '../Components/Pages/Users';

function Router() {
    return (
        <Routes>
            <Route path='/login' element={<Login />} />
                <Route path='/' element={<Layout />}>
                    <Route path='/chats' element={<Chats />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/users' element={<Users />} />
                    <Route path='*' element={<PageNotFound />} />
                    <Route exact path='/translator' element={<TranslatorMobile />} />
                    <Route exact path='/note' element={<NoteMobile />} />
                    <Route path='/welcome' element={<Welcome />} />
                    <Route path='/chats/:roomId' element={<Chats />} />
                </Route>
        </Routes>
    );
}

export default Router;