import ButtonNav from '@app/components/ButtonNav.tsx';
import { useAuthStore } from '@app/modules/auth/AuthStore.ts';
import { useLogInService } from '@app/modules/auth/useLogInService.ts';
import { FC } from 'react';
import { Image } from 'react-bootstrap';
import { GoogleLoginButton } from 'react-social-login-buttons';

const LogInScreen: FC = () => {
    const { isPolling, init, error } = useLogInService();
    const { userInfo } = useAuthStore();
    const handleLogin = async () => {
        await init();
    };
    return (
        <div
            style={{ backgroundColor: 'black', height: '100vh' }}
            className="d-flex justify-content-center align-items-center"
        >
            <div style={{ width: 300 }}>
                <div className="text-center">
                    <Image src="/mailalytics-logo-square.png" height={150} width={150} />
                </div>
                {!userInfo && (
                    <>
                        <p className="text-secondary text-center">
                            To use the app you must first authenticate with Google
                        </p>
                        {error && <p className="text-danger">{error.message}</p>}
                        <GoogleLoginButton onClick={handleLogin} disabled={isPolling}>
                            {isPolling ? 'Checking auth servers..' : 'Log in with Google'}
                        </GoogleLoginButton>
                    </>
                )}
                {userInfo && (
                    <>
                        <p className="text-secondary text-center">
                            Hello {userInfo.name}. Thank you for authenticating.
                        </p>
                        <div className="d-grid gap-2">
                            <ButtonNav href="/dashboard">Go to dashboard</ButtonNav>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default LogInScreen;
