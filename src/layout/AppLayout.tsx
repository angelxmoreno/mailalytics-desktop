import SidePanel from '@app/layout/SidePanel.tsx';
import { FC } from 'react';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

const AppLayout: FC = () => {
    return (
        <main>
            <div className="d-flex">
                <div>
                    <SidePanel />
                </div>
                <div style={{ width: '100%' }}>
                    <Container fluid>
                        <Outlet />
                    </Container>
                </div>
            </div>
        </main>
    );
};

export default AppLayout;
