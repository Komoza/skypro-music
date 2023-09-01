import { Routes, Route } from 'react-router-dom';

import { Main } from './pages/main/main-page';
import { Login } from './pages/login/login';
import { Registration } from './pages/registration/registration';
import { NotFoundPage } from './pages/not-found/not-found';
import { ProtectedRoute } from './protected-route';

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />

            <Route
                element={<ProtectedRoute redirectPath={'/login'} />}
            >
                <Route path="/" element={<Main />} />
                <Route path="/compilation/:id" element={<Main />} />
                <Route path="/playlist" element={<Main />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};
