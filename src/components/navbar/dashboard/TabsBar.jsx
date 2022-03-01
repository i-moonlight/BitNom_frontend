import { Box, Container, Tab, Tabs } from '@mui/material';
import { withStyles } from '@mui/styles';
import { useHistory } from 'react-router-dom';
import { tabs } from '../../utilities/data.components';
import { useStyles } from '../../utilities/styles.components';

export default function TabsBar({
    value,
    handleChange,
    tabOptionsId,
    setTabOptions,
    handleTabOptionsOpen,
}) {
    const history = useHistory();
    const classes = useStyles();

    return (
        <div className={classes.tabBar}>
            <Box className={classes.root}>
                <Container maxWidth="lg">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        variant="scrollable"
                        scrollButtons="auto"
                    >
                        {tabs
                            .filter((tab) => {
                                if (
                                    tab?.link === '/chat' &&
                                    window.location.origin ===
                                        'https://bitnorm.com'
                                ) {
                                    return null;
                                } else {
                                    return tab;
                                }
                            })
                            .map(({ label, menuItems, link, extLink }) => {
                                return (
                                    <BitTab
                                        key={`${label}`}
                                        label={label}
                                        aria-controls={tabOptionsId}
                                        aria-haspopup="true"
                                        onClick={(event) => {
                                            if (extLink) {
                                                window.open(extLink, '_blank');
                                                return;
                                            }
                                            link && history.push(link);
                                            menuItems &&
                                                setTabOptions(menuItems);
                                            menuItems &&
                                                handleTabOptionsOpen(event);
                                        }}
                                    />
                                );
                            })}
                    </Tabs>
                </Container>
            </Box>
        </div>
    );
}

export const BitTab = withStyles((theme) => ({
    root: {
        cursor: 'pointer',
        textTransform: 'none',
        color: theme.palette.mode == 'dark' ? '#fff' : '#000',
        fontWeight: theme.typography.fontWeightBold,
        fontSize: theme.typography.pxToRem(15),
        marginRight: 0,
        '&:focus': {
            opacity: 1,
            color: theme.palette.mode == 'dark' ? '#fff' : '#000',
        },
        '&:hover': {
            backgroundColor:
                theme.palette.mode == 'dark'
                    ? theme.palette.background.paper
                    : theme.palette.background.search,
        },
    },
}))((props) => <Tab disableRipple {...props} />);
