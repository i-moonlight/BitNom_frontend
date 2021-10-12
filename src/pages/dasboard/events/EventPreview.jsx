import { Card, Hidden, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { RoomRounded, VideocamRounded } from '@material-ui/icons';
import React from 'react';
import moment from 'moment';

function EventPreview({ event }) {
    const history = useHistory();
    const truncateText = (str, n, b) => {
        if (str.length <= n) {
            return str;
        }
        const useWordBoundary = b || true;
        const subString = str.substr(0, n - 1); // the original check
        return useWordBoundary
            ? subString.substr(0, subString.lastIndexOf(' '))
            : subString;
    };
    return (
        <Card
            elevation={0}
            key={event?._id}
            onClick={(e) => {
                e.stopPropagation();
                history.push(`/dashboard/events/${event?._id}`);
            }}
            style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                marginBottom: 20,
                marginTop: 20,
                cursor: 'pointer',
                padding: '5px',
                backgroundColor: '#9e9e9e',
            }}
        >
            <div
                style={{
                    backgroundImage:
                        event?.image !== null && event?.image?.trim() !== ''
                            ? 'url(' +
                              process.env.REACT_APP_BACKEND_URL +
                              event?.image +
                              ')'
                            : `url('${'https://picsum.photos/200/300'}')`,
                    backgroundSize: 'cover',
                    width: 170,
                    height: 110,
                    borderRadius: 8,
                    marginRight: 10,
                }}
            ></div>

            <div
                style={{
                    display: 'grid',

                    alignItems: 'stretch',
                    height: 110,
                }}
            >
                <Hidden smDown>
                    <Typography color="textSecondary" variant="body2">
                        {moment(event?.startDate).format(
                            'ddd, MMMM Do YYYY, h:mm a'
                        )}
                    </Typography>
                </Hidden>
                <Typography
                    style={{ textTransform: 'uppercase' }}
                    variant="body2"
                >
                    {event?.location?.type === 'physical'
                        ? event?.title
                        : `${event?.title} (Virtual) `}
                </Typography>
                {event?.location?.type === 'physical' ? (
                    <div className="center-horizontal">
                        <RoomRounded color="primary" />
                        <Typography
                            color="primary"
                            style={{ textDecoration: 'underline' }}
                        >
                            <a
                                href={`https://www.google.com/maps/@?api=1&map_action=map&center=${event?.location?.lat}%2C${event?.location?.long}`}
                                style={{ color: 'inherit', zIndex: '3' }}
                                onClick={(e) => e.stopPropagation()}
                                target="_blank"
                                rel="noreferrer"
                                on
                            >
                                {truncateText(event?.location?.address, 40)}
                            </a>
                        </Typography>
                    </div>
                ) : (
                    <div className="center-horizontal">
                        <VideocamRounded color="primary" />
                        <Typography
                            color="primary"
                            style={{ textDecoration: 'underline' }}
                        >
                            <a
                                href={event?.link}
                                style={{ color: 'inherit', zIndex: '3' }}
                                onClick={(e) => e.stopPropagation()}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Online
                            </a>
                        </Typography>
                    </div>
                )}

                <Typography variant="body2">
                    {`${event?.attendees?.length} ${
                        new Date(event?.endDate).getTime() <
                        new Date().getTime()
                            ? 'Attended'
                            : 'Going'
                    }`}
                </Typography>
            </div>
        </Card>
    );
}

export default EventPreview;
