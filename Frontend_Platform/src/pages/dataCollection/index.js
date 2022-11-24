import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { BuildingContextProvider } from './components/Context/context';
export default function IndexPage() {
    return (
        <BuildingContextProvider>
            <Outlet />
        </BuildingContextProvider>
    );
}

