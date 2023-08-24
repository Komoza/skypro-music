import { Routes, Route } from 'react-router-dom';

import { Main } from './pages/main/main-page';
import { Login } from './pages/login/login';
import { Registration } from './pages/registration/registration';
import { Compilation } from './pages/compilation/compilation';
import { MyPlaylist } from './pages/my-playlist/my-playlist';
import { NotFoundPage } from './pages/not-found/not-found';
import { ProtectedRoute } from './protected-route';
import { User, UserContext } from './App';

interface AppRoutesProps {
    setUser: (value: User | null) => void;
}

export const AppRoutes: React.FC<AppRoutesProps> = ({ setUser }) => {
    return (
        <Routes>
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route
                path="/registration"
                element={<Registration setUser={setUser} />}
            />

            <Route
                element={
                    <UserContext.Consumer>
                        {(user) => (
                            <ProtectedRoute
                                user={user}
                                redirectPath={'/login'}
                            />
                        )}
                    </UserContext.Consumer>
                }
            >
                <Route
                    path="/"
                    element={<Main status={'Main'} setUser={setUser} />}
                />
                <Route path="/compilation/:id" element={<Compilation />} />
                <Route
                    path="/playlist"
                    element={<Main status={'Playlist'} setUser={setUser} />}
                />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};
