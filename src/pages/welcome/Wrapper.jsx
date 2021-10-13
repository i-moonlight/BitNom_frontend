import React, { useEffect } from 'react';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import NavBarInvestor from '../../components/navbar/investor/NavBarInvestor';
import NavBarLanding from '../../components/navbar/landing/NavBarLanding';
import Footer from './Footer';

export default function Wrapper({ children, investor, onTabValue, authPage }) {
    const history = useHistory();
    const state = useSelector((st) => st);
    const user = state.auth.user;
    const toTop = useRef(null);

    useEffect(() => {
        if (JSON.stringify(user) !== '{}') {
            if (!user?.email?.verified) {
                history.push('/auth/require_verify');
            } else {
                if (user?.email?.verified && !user?.displayName) {
                    history.push('/auth/update_info_register');
                } else {
                    authPage && history.push('/connect');
                }
            }
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [authPage, history, user]);

    return (
        <div
            ref={toTop}
            style={{
                width: '100%',
                paddingTop: investor ? 0 : 116,
                minHeight: '100vh',
                overflowY: 'hidden',
            }}
        >
            {investor ? (
                <NavBarInvestor onTabValue={onTabValue} />
            ) : (
                <NavBarLanding />
            )}
            {children}
            <Footer />
        </div>
    );
}
