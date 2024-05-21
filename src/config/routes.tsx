import AppLayout from '@app/layout/AppLayout.tsx';
import DialogLayout from '@app/layout/DialogLayout.tsx';
import DashboardScreen from '@app/screens/DashboardScreen.tsx';
import LabelsScreen from '@app/screens/LabelsScreen.tsx';
import LogInScreen from '@app/screens/LogInScreen.tsx';
import MessagesScreen from '@app/screens/MessagesScreen.tsx';
import { createBrowserRouter, RouteObject } from 'react-router-dom';

export const dashboardScreens: RouteObject[] = [
    { path: '/dashboard', element: <DashboardScreen />, index: true },
    { path: '/dashboard/messages', element: <MessagesScreen /> },
    { path: '/dashboard/labels', element: <LabelsScreen /> },
];

const dialogs: RouteObject[] = [];
const dashboardRoutes: RouteObject = {
    element: <AppLayout />,
    children: dashboardScreens,
};

const dialogRoutes: RouteObject = {
    element: <DialogLayout />,
    children: dialogs,
};

export const router = createBrowserRouter([{ path: '/', element: <LogInScreen /> }, dashboardRoutes, dialogRoutes]);
