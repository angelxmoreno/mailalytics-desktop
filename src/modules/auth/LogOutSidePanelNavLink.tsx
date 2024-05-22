import AppIcon from '@app/components/AppIcon.tsx';
import { useAuthStore } from '@app/modules/auth/AuthStore.ts';
import { FC } from 'react';

const LogOutSidePanelNavLink: FC = () => {
    const { logout } = useAuthStore();
    return (
        <li className="nav-item">
            <a href="#" onClick={() => logout()} className="nav-link text-white d-flex" aria-current="page">
                <AppIcon name="mdiLogout" />
                Log Out
            </a>
        </li>
    );
};

export default LogOutSidePanelNavLink;
