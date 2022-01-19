import { useTheme } from '@emotion/react';
import { LinkedIn, MailRounded } from '@mui/icons-material';
import {
    Card,
    CardContent,
    Container,
    Grid,
    IconButton,
    Typography,
} from '@mui/material';
import { team } from '../../utilities/welcome.data';
import TeamCard from '../cards/TeamCard';

export default function Team() {
    const theme = useTheme();

    return (
        <section
            className="py-5"
            style={{ backgroundColor: theme.palette.background.investorDark }}
        >
            <Container maxWidth="lg">
                <Card
                    elevation={0}
                    style={{
                        background: theme.palette.background.investorShade,
                    }}
                >
                    <CardContent>
                        <Typography className="lead mb-3 mt-1">
                            A word from our CEO
                        </Typography>
                        <Card
                            elevation={0}
                            style={{
                                background:
                                    theme.palette.background.investorCards,
                            }}
                        >
                            <CardContent>
                                <div className="p-3 pb-0">
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={4}>
                                            <div
                                                className="bg-white h-100 br-2"
                                                style={{
                                                    backgroundImage: `url('${team[0].image}')`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition:
                                                        'center',
                                                }}
                                            ></div>
                                        </Grid>
                                        <Grid item xs={12} sm={8}>
                                            <div className="d-flex flex-column mx-3 h-100">
                                                <Typography>
                                                    {team[0].name}
                                                </Typography>
                                                <Typography color="primary">
                                                    {team[0].role}
                                                </Typography>
                                                <Typography variant="body2">
                                                    {team[0].desc}
                                                </Typography>
                                                <div className="mt-4">
                                                    <IconButton size="small">
                                                        <MailRounded />
                                                    </IconButton>
                                                    <IconButton size="small">
                                                        <LinkedIn />
                                                    </IconButton>
                                                </div>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>
                            </CardContent>
                        </Card>
                        <Typography className="lead mb-3 mt-5">
                            Our Advisors
                        </Typography>
                        <Grid container spacing={2}>
                            {team
                                .filter(
                                    ({ category }) => category === 'advisor'
                                )
                                .map((member) => (
                                    <TeamCard
                                        key={member?.name}
                                        member={member}
                                        desc
                                    />
                                ))}
                        </Grid>
                        <Typography className="lead mb-3 mt-5">
                            Development Team
                        </Typography>
                        <Grid container spacing={2}>
                            {team
                                .filter(({ category }) => category === 'dev')
                                .map((member) => (
                                    <TeamCard
                                        key={member?.name}
                                        member={member}
                                    />
                                ))}
                        </Grid>
                    </CardContent>
                </Card>
            </Container>
        </section>
    );
}
