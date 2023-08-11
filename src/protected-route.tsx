import { Navigate, Outlet } from 'react-router-dom';
import { User } from './App';

interface ProtectedRouteProps {
    redirectPath: string;
    user: User | null;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    redirectPath,
    user,
}) => {
    if (!user) {
        return <Navigate to={redirectPath} replace={true} />;
    }

    return <Outlet />;
};
