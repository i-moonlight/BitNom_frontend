import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import NavBar from './navbar/dashboard/NavBar';

export default function Screen({ auth, children }) {
    const history = useHistory();
    const state = useSelector((st) => st);

    const user = state.auth.user;

    useEffect(() => {
        JSON.stringify(user) === '{}' && !auth && history.push('/auth/login');
        user?.email?.verified &&
            !user.displayName &&
            history.push('/auth/update_info_register');
    }, [auth, history, user]);

    return (
        <div style={{ minHeight: '100vh' }}>
            <NavBar />
            <div style={{ height: 144 }}></div>
            {children}
        </div>
    );
}
