import { ChevronLeftRounded, ChevronRightRounded } from '@mui/icons-material';
import { Box, Container, MenuItem, Typography } from '@mui/material';
import { useState } from 'react';
import { tabs } from '../../utilities/data.components';
import { useStyles } from '../../utilities/styles.components';

export default function TabsBar2() {
    const [activeTab, setActiveTab] = useState(0);
    const [hoveredTab, setHoveredTab] = useState(-1);
    const [activeTabWidth, setActiveTabWidth] = useState(147);
    // const [activeTabOffset, setActiveTabOffset] = useState(0);
    const classes = useStyles();

    return (
        <div className={classes.tabBar}>
            <Box className={classes.root}>
                <Container maxWidth="lg">
                    <div className="d-flex center-horizontal">
                        <div className="mx-1">
                            <ChevronLeftRounded />
                        </div>
                        <div
                            className="scroll-hidden"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                overflowX: 'auto',
                            }}
                        >
                            {tabs.map(({ label, menuItems }, index) => (
                                <div
                                    key={label}
                                    className={
                                        index === activeTab
                                            ? classes.topTabsActive
                                            : classes.topTabs
                                    }
                                    onClick={() => {
                                        setActiveTab(index);
                                    }}
                                    onMouseEnter={(e) => {
                                        setActiveTabWidth(e.target.offsetWidth);
                                        setHoveredTab(index);
                                        // setActiveTabOffset(e.target.offsetLeft);
                                    }}
                                    onMouseLeave={() => {
                                        setHoveredTab(-1);
                                    }}
                                >
                                    <Typography
                                        className="fw-bold"
                                        color="textPrimary"
                                        noWrap
                                        style={{
                                            paddingTop: 12,
                                            paddingBottom: 12,
                                        }}
                                    >
                                        <span className="center-horizontal justify-content-center">
                                            {label}
                                            {/* {activeTabOffset} */}
                                            {menuItems && (
                                                <ChevronRightRounded
                                                    style={{
                                                        transform:
                                                            'rotate(90deg)',
                                                        marginLeft: 5,
                                                    }}
                                                />
                                            )}
                                        </span>
                                    </Typography>
                                    <div
                                        className={classes.menuPopover}
                                        style={
                                            {
                                                // offset: `${activeTabOffset}px 0px`,
                                                // right: activeTabOffset,
                                            }
                                        }
                                    >
                                        {index === hoveredTab &&
                                            menuItems &&
                                            menuItems.map(
                                                ({ label: option }) => (
                                                    <MenuItem
                                                        key={`${
                                                            Math.random() * 1000
                                                        }`}
                                                        className="py-3 space-between"
                                                        style={{
                                                            width: activeTabWidth,
                                                        }}
                                                        onClick={() =>
                                                            setHoveredTab(-1)
                                                        }
                                                    >
                                                        <Typography
                                                            className="fw-bold"
                                                            color="textPrimary"
                                                        >
                                                            {option}
                                                        </Typography>
                                                    </MenuItem>
                                                )
                                            )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mx-1">
                            <ChevronRightRounded />
                        </div>
                    </div>
                </Container>
            </Box>
        </div>
    );
}
