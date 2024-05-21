import SidePanelNavLink from '@app/layout/SidePanelNavLink.tsx';
import { useAuthStore } from '@app/modules/auth/AuthStore.ts';
import LogOutSidePanelNavLink from '@app/modules/auth/LogOutSidePanelNavLink.tsx';
import useProtectedRoute from '@app/modules/auth/useProtectedRoute.tsx';
import { FC } from 'react';
import { Image } from 'react-bootstrap';

const SidePanel: FC = () => {
    useProtectedRoute();
    const { userInfo } = useAuthStore();

    return (
        <main className="d-flex flex-nowrap vh-100">
            <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark" style={{ width: '280px' }}>
                <div className="d-flex flex-row align-items-center">
                    <Image src="/mailalytics-logo-square.png" height={50} width={50} className="me-2" />
                    <span className="fs-4">Mailalytics</span>
                </div>
                <hr />
                <ul className="nav nav-pills flex-column mb-auto">
                    <SidePanelNavLink href="/dashboard" label="Dashboard" iconName="mdiSpeedometer" />
                    <SidePanelNavLink href="/dashboard/messages" label="Messages" iconName="mdiEmailOpenMultiple" />
                    <SidePanelNavLink href="/dashboard/labels" label="Labels" iconName="mdiLabelMultiple" />
                    <LogOutSidePanelNavLink />
                </ul>
                <hr />
                <div className="d-flex align-items-center justify-content-center">
                    {userInfo?.picture && (
                        <img src={userInfo?.picture} alt={userInfo?.name} width={25} height={25} className="me-2" />
                    )}
                    <span>{userInfo?.name || userInfo?.email}</span>
                </div>
            </div>
        </main>
    );
};

export default SidePanel;
