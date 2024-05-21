import { useAuthStore } from '@app/modules/auth/AuthStore.ts';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useProtectedRoute = () => {
    const { userInfo, isLoggedIn } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn()) {
            navigate('/');
        }
    }, [userInfo]);
};

export default useProtectedRoute;
