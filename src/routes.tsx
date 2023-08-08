import { Routes, Route } from 'react-router-dom';

import { Main } from './pages/main/main-page';
import { Login } from './pages/login/login';
import { Registration } from './pages/registration/registration';
import { Compilation } from './pages/compilation/compilation';
import { MyPlaylist } from './pages/my-playlist/my-playlist';
import { NotFoundPage } from './pages/not-found/not-found';
import { ProtectedRoute } from './protected-route';
import { Song } from './App';

interface AppRoutesProps {
    user: {
        isAllowed: boolean;
    };
    isLoadApp: boolean;
    songs: Song[] | null;
    currentSong: Song | null;
    setCurrentSong: (value: Song | null) => void;
}

export const AppRoutes: React.FC<AppRoutesProps> = ({
    user,
    isLoadApp,
    songs,
    currentSong,
    setCurrentSong,
}) => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />

            <Route
                element={
                    <ProtectedRoute
                        isAllowed={user.isAllowed}
                        redirectPath={'/login'}
                    />
                }
            >
                <Route
                    path="/"
                    element={
                        <Main
                            isLoadApp={isLoadApp}
                            songs={songs}
                            currentSong={currentSong}
                            setCurrentSong={setCurrentSong}
                        />
                    }
                />
                <Route path="/compilation/:id" element={<Compilation />} />
                <Route path="/playlist" element={<MyPlaylist />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};
