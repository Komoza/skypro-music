import { Routes, Route } from 'react-router-dom';

import { Main } from './pages/main/main-page';
import { Login } from './pages/login/login';
import { Registration } from './pages/registration/registration';
import { Compilation } from './pages/compilation/compilation';
import { MyPlaylist } from './pages/my-playlist/my-playlist';
import { NotFoundPage } from './pages/not-found/not-found';

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/compilation/:id" element={<Compilation />} />
            <Route path="/playlist" element={<MyPlaylist />} />

            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};
