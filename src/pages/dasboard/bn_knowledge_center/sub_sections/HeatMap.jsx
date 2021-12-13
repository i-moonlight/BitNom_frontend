import { ArrowDropDown, Fullscreen } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { Button } from '../../../../components/Button';

export default function HeatMap() {
    return (
        <div>
            <Typography
                color={'textPrimary'}
                className={
                    'd-flex justify-content-between align-items-center my-3'
                }
            >
                <div className={'d-flex align-items-center'}>
                    <strong>
                        Performance:{' '}
                        <Button
                            textCase
                            variant={'text'}
                            size="small"
                            className="me-2"
                            endIcon={<ArrowDropDown />}
                        >
                            1 Day
                        </Button>
                    </strong>
                    <strong>
                        Block Size:{' '}
                        <Button
                            textCase
                            variant={'text'}
                            size="small"
                            className="me-2"
                            endIcon={<ArrowDropDown />}
                        >
                            Volume
                        </Button>
                    </strong>
                    <strong>
                        Items in the Map:{' '}
                        <Button
                            textCase
                            variant={'text'}
                            size="small"
                            className="me-2"
                            endIcon={<ArrowDropDown />}
                        >
                            50
                        </Button>
                    </strong>
                </div>
                <Button textCase endIcon={<Fullscreen />}>
                    Full Screen
                </Button>
            </Typography>
            <section className={'bg-info'}>{/* HeatMap */}</section>
        </div>
    );
}
