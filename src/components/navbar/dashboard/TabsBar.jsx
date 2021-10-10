import { Box } from '@material-ui/core';
import { Container, Tab, Tabs, withStyles } from '@material-ui/core';
import React from 'react';
import { tabs } from '../../utilities/data.components';
import { useStyles } from '../../utilities/styles.components';
import { useHistory } from 'react-router-dom';

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
                        {tabs.map(({ label, menuItems, link }) => {
                            // const tabOptionsId2 =
                            tabOptionsId + Math.random() * 1000;
                            return (
                                <BitTab
                                    key={`${tabOptionsId}-${Math.random}`}
                                    label={label}
                                    aria-controls={tabOptionsId}
                                    aria-haspopup="true"
                                    onClick={(event) => {
                                        link && history.push(link);
                                        menuItems && setTabOptions(menuItems);
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

const BitTab = withStyles((theme) => ({
    root: {
        textTransform: 'none',
        color: theme.palette.type == 'dark' ? '#fff' : '#000',
        fontWeight: theme.typography.fontWeightBold,
        fontSize: theme.typography.pxToRem(15),
        marginRight: 0,
        '&:focus': {
            opacity: 1,
            color: theme.palette.type == 'dark' ? '#fff' : '#000',
        },
        '&:hover': {
            backgroundColor:
                theme.palette.type == 'dark'
                    ? theme.palette.background.paper
                    : theme.palette.background.search,
        },
    },
}))((props) => <Tab disableRipple {...props} />);
