import { Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import RoadMapSection from '../investor/sections/RoadMap';
import Wrapper from '../Wrapper';

export default function RoadMap() {
    return (
        <Wrapper>
            <Container maxWidth="lg">
                <div className="py-4 mb-4">
                    <Typography variant="h4" color="textPrimary">
                        BitNorm Roadmap
                    </Typography>
                    <Typography variant="h6" color="textPrimary">
                        The highway to building a legacy that will foster
                        innovation.
                    </Typography>
                </div>
            </Container>
            <RoadMapSection />
        </Wrapper>
    );
}
