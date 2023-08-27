import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from './store/actions/types/types';


interface ProtectedRouteProps {
    redirectPath: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    redirectPath,
}) => {
    const user = useSelector((state: RootState) => state.otherState.user);
    if (!user) {
        return <Navigate to={redirectPath} replace={true} />;
    }

    return <Outlet />;
};
