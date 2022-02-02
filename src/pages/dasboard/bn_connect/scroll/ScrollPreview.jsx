import {
    Avatar,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    Grid,
    Typography,
} from '@mui/material';
import { useHistory } from 'react-router-dom';
import { getDistanceToNowWithSuffix } from '../../../../components/utilities/date.components';
import { getUserInitials } from '../../../../utilities/Helpers';
import { contentBodyFactory, getReactionsSum } from '../../utilities/functions';

export default function ScrollPreview({ scroll }) {
    const history = useHistory();
    const contentClickHandler = (e) => {
        const targetLink = e.target.closest('a');
        if (!targetLink) return;
        e.preventDefault();
        e.stopPropagation();
        history.push(targetLink.href.substring(location.origin.length));
    };
    const authorInitials = getUserInitials(scroll?.author?.displayName);

    return (
        <>
            <Card
                variant="outlined"
                style={{ marginBottom: 16, marginTop: 16, zIndex: 2 }}
                onClick={(e) => {
                    e.stopPropagation();
                    history.push(`/post/${scroll?._id}`);
                }}
            >
                <CardHeader
                    avatar={
                        <Avatar
                            style={{
                                backgroundColor: '#fed132',
                            }}
                            src={
                                scroll?.author?.profile_pic &&
                                process.env.REACT_APP_BACKEND_URL +
                                    scroll?.author?.profile_pic
                            }
                            sx={{ width: '28px', height: '28px' }}
                        >
                            <Typography variant="body2">
                                {authorInitials}
                            </Typography>
                        </Avatar>
                    }
                    title={
                        <div className="d-flex align-items-center">
                            <Typography
                                component="a"
                                style={{ marginRight: 8, zIndex: 3 }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    history.push(
                                        `/users/${scroll?.author?._id}`
                                    );
                                }}
                                variant="body2"
                            >
                                {scroll?.author?.displayName}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {` @${scroll?.author?._id}`}
                            </Typography>
                        </div>
                    }
                    subheader={
                        <Typography
                            component="span"
                            color="textSecondary"
                            variant="body2"
                        >
                            {getDistanceToNowWithSuffix(scroll?.createdAt)}
                        </Typography>
                    }
                />
                <CardContent>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="div"
                    >
                        <Typography
                            variant="body2"
                            onClick={(e) => contentClickHandler(e)}
                            component="div"
                            dangerouslySetInnerHTML={{
                                __html: contentBodyFactory(scroll),
                            }}
                            style={{
                                zIndex: 2,
                                overflowWrap: 'break-word',
                                wordWrap: 'break-word',
                            }}
                        ></Typography>
                        <br />
                        <Grid container style={{ margin: '3px 0px' }}>
                            {(scroll?.video?.length > 0 ||
                                scroll?.video?.path) && (
                                <Grid item xs={12}>
                                    <CardMedia
                                        component="video"
                                        //poster={`${process.env.REACT_APP_BACKEND_URL}${scroll?.video?.thumbnail}`}
                                        src={
                                            typeof scroll?.video == 'string'
                                                ? `${process.env.REACT_APP_BACKEND_URL}${scroll?.video}`
                                                : `${process.env.REACT_APP_BACKEND_URL}${scroll?.video?.path}`
                                        }
                                        controls
                                        preload="metadata"
                                    />
                                </Grid>
                            )}
                            {scroll?.images.length > 0 &&
                                scroll?.images?.map((imageURL) => (
                                    <Grid
                                        style={{ zIndex: 2, padding: '2px' }}
                                        key={imageURL}
                                        item
                                        xs={scroll?.images.length > 1 ? 6 : 12}
                                    >
                                        <div
                                            style={{
                                                height: 200,
                                                borderRadius: 8,
                                                width: '100%',
                                                backgroundImage:
                                                    'url(' +
                                                    process.env
                                                        .REACT_APP_BACKEND_URL +
                                                    imageURL +
                                                    ')',
                                                backgroundSize: 'cover',
                                                backgroundColor:
                                                    'rgba(0,0,0,0.2)',
                                                backgroundBlendMode:
                                                    'soft-light',
                                                cursor: 'pointer',
                                            }}
                                        />
                                    </Grid>
                                ))}
                        </Grid>
                        <br />
                        <Typography
                            component="div"
                            variant="body2"
                            display="inline"
                        >
                            <Typography variant="body2" display="inline">
                                {`${getReactionsSum(scroll)} ${
                                    getReactionsSum(scroll) === 1
                                        ? 'Reaction'
                                        : 'Reactions'
                                }`}
                            </Typography>
                            {' . '}
                            <Typography variant="body2" display="inline">
                                {`${scroll?.comments} ${
                                    scroll?.comments === 1
                                        ? 'Comment'
                                        : 'Comments'
                                }`}
                            </Typography>
                        </Typography>
                    </Typography>
                </CardContent>
            </Card>
        </>
    );
}
