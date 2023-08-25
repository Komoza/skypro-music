import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { MusicState } from './store/actions/types/types';

interface ProtectedRouteProps {
    redirectPath: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    redirectPath,
}) => {
    const user = useSelector((state: MusicState) => state.user);
    if (!user) {
        return <Navigate to={redirectPath} replace={true} />;
    }

    return <Outlet />;
};
