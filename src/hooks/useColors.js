import { useTheme } from '@material-ui/core';
import { useEffect, useState } from 'react';

export default function useColors() {
  const themeUse = useTheme();

  const theme = '#006097';
  const white = '#fff';

  const themeDark = {
    theme,
    button: theme,
    buttonAlt: white,
  };

  const themeLight = {
    theme,
    button: theme,
    buttonAlt: white,
  };

  const [themeColors, setThemeColors] = useState(themeDark);

  useEffect(() => {
    themeUse.palette.type === 'light' && setThemeColors(themeLight);
  }, [themeUse]);

  return themeColors;
}
