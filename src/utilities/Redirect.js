import { useEffect } from 'react';
import { useHistory } from 'react-router';
import NotFound from '../pages/not_found/NotFound';

export default function Redirect() {
    const history = useHistory();

    useEffect(() => {
        const loc = location.search.slice(6);
        window.open(loc, '_blank');
        history.goBack();
    }, [history]);

    return <NotFound />;
}
