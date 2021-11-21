import { useEffect, useState } from 'react';

export const useThemeDetector = () => {
    const getCurrentTheme = () =>
        window.matchMedia('(prefers-color-scheme: dark)').matches;

    const [isDarkThemeOnly, setIsDarkThemeOnly] = useState(getCurrentTheme());

    // console.log('getCurrentTheme: ', getCurrentTheme());

    const mqListener = (e) => {
        setIsDarkThemeOnly(e.matches);
    };

    useEffect(() => {
        const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
        darkThemeMq.addEventListener('change', mqListener);
        return () => darkThemeMq.removeEventListener('change', mqListener);
    }, []);

    return isDarkThemeOnly;
};
