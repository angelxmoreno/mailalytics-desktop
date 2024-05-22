import { FC } from 'react';
import Container from 'react-bootstrap/Container';
import { Outlet } from 'react-router-dom';

const DialogLayout: FC = () => {
    return (
        <Container>
            <div>
                <Outlet />
            </div>
        </Container>
    );
};

export default DialogLayout;
