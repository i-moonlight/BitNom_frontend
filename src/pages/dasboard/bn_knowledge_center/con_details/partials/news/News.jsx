import { Logout } from '@mui/icons-material';
import { Card, CardContent, Chip, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { formatDistance } from 'date-fns';
import { useEffect, useState } from 'react';
import { Button } from '../../../../../../components/Button';
import { useStyles } from '../utils/styles';

export default function News({ coinDetail }) {
    const [toggleState, setToggleState] = useState('recent');
    const [newsList, setNewsList] = useState();

    const btnColor = useStyles();
    const newsApiUrl = `http://cryptopanic.com/api/v1/posts/?auth_token=24781b8f72c2b94ed43722082d71b5107317752e&currencies=${coinDetail?.symbol?.toUpperCase()}&kind=news&public=true&filter=${toggleState}`;

    const toggleTab = (index) => {
        setToggleState(index);
    };

    const getActiveTabClass = (index, className) => {
        return toggleState !== index ? className : btnColor.bGNormal;
    };

    useEffect(() => {
        axios.get(newsApiUrl).then((res) => {
            setNewsList(res.data.results);
        });
        // .catch((err) => console.log(err));
    }, [newsApiUrl]);

    return (
        <Typography
            color={'textPrimary'}
            sx={{ width: '100%', typography: 'body1' }}
            component="div"
        >
            <div className={'d-flex mb-3'}>
                <Button
                    size="small"
                    color={'inherit'}
                    className={getActiveTabClass('recent', btnColor.bGActive)}
                    onClick={() => toggleTab('recent')}
                    textCase
                >
                    Recent
                </Button>
                <Button
                    size="small"
                    color={'inherit'}
                    className={getActiveTabClass('hot', btnColor.bGActive)}
                    onClick={() => toggleTab('hot')}
                    textCase
                >
                    Hot
                </Button>
            </div>
            <div className={'my-1'}>
                <div>
                    <Grid container spacing={2} alignItems="stretch">
                        {newsList?.map((newsItem) => (
                            <NewsItem key={newsItem?.id} newsItem={newsItem} />
                        ))}
                    </Grid>
                </div>
            </div>
        </Typography>
    );
}

const NewsItem = ({ newsItem }) => {
    const { created_at, source, title, url, currencies } = newsItem;

    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card>
                <CardContent>
                    <Typography variant="body2">{title}</Typography>
                    <div className="mt-2">
                        {currencies?.map(({ code }) => (
                            <Chip
                                className="me-2 mb-2"
                                color="primary"
                                variant="outlined"
                                size="small"
                                key={code}
                                label={code}
                            />
                        ))}
                    </div>
                    <div className="d-flex align-items-center justify-content-between mt-2">
                        <Typography variant="body2" color="GrayText">
                            {formatDistance(Date.parse(created_at), new Date())}
                        </Typography>
                        <Button
                            textCase
                            size="small"
                            endIcon={<Logout />}
                            variant="text"
                            onClick={() => {
                                window.open(url, '_blank');
                            }}
                        >
                            {source?.title}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </Grid>
    );
};
