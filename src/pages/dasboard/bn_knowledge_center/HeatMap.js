/**
 * Created by PhpStorm.
 * User: don@donphelix.com
 * Date: 10/21/21
 * Time: 7:31 PM
 */

import { ArrowDropDown, Fullscreen } from '@mui/icons-material';

export default function HeatMap() {
    return (
        <>
            <div>
                <section
                    className={
                        'd-lg-flex d-md-flex d-sm-block  justify-content-between m-3'
                    }
                >
                    <div className={'d-lg-flex d-md-flex d-sm-block '}>
                        <strong>
                            Performance:{' '}
                            <span className={'text-secondary'}>1 Day</span>{' '}
                            <ArrowDropDown />
                        </strong>
                        <strong>
                            Block Size:{' '}
                            <span className={'text-secondary'}>Volume</span>{' '}
                            <ArrowDropDown />
                        </strong>
                        <strong>
                            Items in the Map:{' '}
                            <span className={'text-secondary'}>50</span>{' '}
                            <ArrowDropDown />
                        </strong>
                    </div>
                    <div>
                        <button className={'btn btn-secondary'}>
                            Full Screen <Fullscreen />
                        </button>
                    </div>
                </section>
                <section className={'row m-3'}>
                    <div
                        className={'col-6 border'}
                        style={{
                            minHeight: '250px',
                            backgroundColor: '#9cc56f',
                        }}
                    >
                        <p className={'display-5'}>BTC $47,523.78 -1.00%</p>
                    </div>
                    <div className={'col-6  border'}>
                        <span
                            style={{
                                minHeight: '150px',
                                backgroundColor: 'rgb(130 191 63)',
                            }}
                            className={'d-flex'}
                        >
                            <p className={'display-6 border'}>
                                ETH $3,313.22 -2.88 %
                            </p>
                            <p className={'display-6 border'}>
                                ETH $3,313.22 -2.88 %
                            </p>
                        </span>
                        <div
                            style={{
                                minHeight: '100px',
                                backgroundColor: 'rgb(92 128 53)',
                            }}
                        >
                            <p className={'display-6 '}>
                                ETH $3,313.22 -2.88 %
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
