import { ThumbDownRounded, ThumbUpRounded } from '@mui/icons-material';
import {
    Avatar,
    Card,
    CardContent,
    Grid,
    Typography,
    useTheme,
} from '@mui/material';

export default function RequestDisplayCard() {
    const theme = useTheme();

    return (
        <Card
            style={{
                backgroundColor: theme.palette.background.default,
                marginTop: 16,
            }}
            elevation={4}
        >
            <CardContent>
                <Grid container>
                    <Grid item sm={1} className="mr-3">
                        <ThumbUpRounded />
                        <Typography>5</Typography>
                        <ThumbDownRounded />
                    </Grid>
                    <Grid item sm={11}>
                        <div className="space-between center-horizontal">
                            <div className="center-horizontal">
                                <Avatar style={{ width: 30, height: 30 }}>
                                    MA
                                </Avatar>
                                <Typography variant="body2" className="mx-2">
                                    Mark Aloo
                                </Typography>
                                <Typography variant="body2" className="mx-2">
                                    .
                                </Typography>
                                <Typography variant="body2" className="mx-2">
                                    Posted on 27 May 2021
                                </Typography>
                            </div>
                            <Typography variant="body2">PLANNED</Typography>
                        </div>
                        <div className="my-2">
                            <Typography>Dark Mode Option</Typography>
                            <Typography variant="body2">
                                It would be fantastic to have a Dark Mode Toggle
                                setting that can alter how the page is seen by
                                visitors /members. The white can be bright and
                                jarring to sensitive eyes!
                            </Typography>
                        </div>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}
