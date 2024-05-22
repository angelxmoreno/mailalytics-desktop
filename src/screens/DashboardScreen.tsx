import { Breadcrumb } from 'react-bootstrap';

function DashboardScreen() {
    return (
        <>
            <h1>DashBoard</h1>
            <Breadcrumb>
                <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
                    Library
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Data</Breadcrumb.Item>{' '}
            </Breadcrumb>
        </>
    );
}

export default DashboardScreen;
