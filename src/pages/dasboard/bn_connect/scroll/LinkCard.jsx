import { LinkOutlined } from '@mui/icons-material';
import {
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Divider,
    Typography,
} from '@mui/material';

export default function LinkCard({ link }) {
    const { image, title, description, url, hostname } = link || {};

    return (
        <Card
            // className={classes.root}
            variant="outlined"
        >
            <CardActionArea onClick={() => window.open(url, '_blank')}>
                <CardMedia
                    component="img"
                    style={{ height: 140 }}
                    image={image}
                    title={title}
                />
                <CardContent>
                    <Typography gutterBottom variant="body1">
                        {title}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                    >
                        {description}
                    </Typography>
                </CardContent>
                <Divider />
                <CardActions>
                    <LinkOutlined className="mx-2" />
                    {hostname}
                </CardActions>
            </CardActionArea>
        </Card>
    );
}
