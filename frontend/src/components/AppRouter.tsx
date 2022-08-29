import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { publicRoutes, techRoutes } from '../router';
import { UserRoles } from '../types/auth';

const AppRouter = () => {
    const { user } = useTypedSelector(state => state.auth)    
    return (
        <Routes>
            {publicRoutes.map(route =>
                <Route key={route.path}
                    path={route.path}
                    element={<route.element />}
                />
            )}
            {(user?.roles.includes(UserRoles.TECHNOLOGIST) || user?.roles.includes(UserRoles.SPECIALIST) || user?.roles.includes(UserRoles.ADMIN)) &&
                techRoutes.map(route =>
                    <Route key={route.path}
                        path={route.path}
                        element={<route.element />}
                    />
                )
            }

        </Routes>
    )
};

export default AppRouter;