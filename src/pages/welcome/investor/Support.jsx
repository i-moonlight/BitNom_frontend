import { Container, Grid } from '@mui/material';
import { useHistory } from 'react-router';
import DarkThemeOnly from '../../../utilities/DarkThemeOnly';
import Wrapper from '../Wrapper';
import DonateCard from './cards/DonateCard';

export default function Support() {
    const history = useHistory();

    const onTabValue = (val) => {
        switch (val) {
            case 1:
                history.push('/investors#ecosystem');
                break;
            case 2:
                history.push('/investors#roadmap');
                break;
            default:
                history.push('/investors#');
        }
    };

    return (
        <Wrapper onTabValue={onTabValue}>
            <DarkThemeOnly>
                <div>
                    <section style={{ backgroundColor: '#000' }}>
                        <Container maxWidth="lg">
                            <div style={{ backgroundColor: '#000' }}>
                                <Grid container spacing={2}>
                                    <Grid item md={3} sm={2}></Grid>
                                    <Grid item md={6} sm={8} xs={12}>
                                        <DonateCard />
                                    </Grid>
                                    <Grid item md={3} sm={2}></Grid>
                                </Grid>
                            </div>
                        </Container>
                    </section>
                </div>
            </DarkThemeOnly>
        </Wrapper>
    );
}
