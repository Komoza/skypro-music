import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
    redirectPath: string;
    isAllowed: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    redirectPath,
    isAllowed,
}) => {
    if (!isAllowed) {
        return <Navigate to={redirectPath} replace={true} />;
    }

    return <Outlet />;
};
