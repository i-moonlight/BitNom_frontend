import * as React from 'react';
import { Fragment } from 'react';

export default function Team() {
    return (
        <Fragment>
            <div>
                <h4>
                    <strong>Team</strong>
                </h4>
                <hr />
                <div className={'d-flex justify-content-between'}>
                    <div className={'row'} style={custom.cardsContainer}>
                        <div className={'col-3'}>
                            <img
                                src={
                                    'https://mod.go.ke/wp-content/uploads/2021/04/default-profile-pic.png'
                                }
                                className="rounded-circle"
                                alt="Cinque Terre"
                                width="30"
                                height="30"
                            />
                        </div>
                        <div className={'col-9'}>
                            <p>
                                Don Phelix <span>Bitcoin Core Contributor</span>
                            </p>
                        </div>
                    </div>
                    <div className={'row'} style={custom.cardsContainer}>
                        <div className={'col-3'}>
                            <img
                                src={
                                    'https://mod.go.ke/wp-content/uploads/2021/04/default-profile-pic.png'
                                }
                                className="rounded-circle"
                                alt="Cinque Terre"
                                width="30"
                                height="30"
                            />
                        </div>
                        <div className={'col-9'}>
                            <p>
                                Don Phelix <span>Bitcoin Core Contributor</span>
                            </p>
                        </div>
                    </div>
                    <div className={'row'} style={custom.cardsContainer}>
                        <div className={'col-3'}>
                            <img
                                src={
                                    'https://mod.go.ke/wp-content/uploads/2021/04/default-profile-pic.png'
                                }
                                className="rounded-circle"
                                alt="Cinque Terre"
                                width="30"
                                height="30"
                            />
                        </div>
                        <div className={'col-9'}>
                            <p>
                                Don Phelix <span>Bitcoin Core Contributor</span>
                            </p>
                        </div>
                    </div>
                    <div className={'row'} style={custom.cardsContainer}>
                        <div className={'col-3'}>
                            <img
                                src={
                                    'https://mod.go.ke/wp-content/uploads/2021/04/default-profile-pic.png'
                                }
                                className="rounded-circle"
                                alt="Cinque Terre"
                                width="30"
                                height="30"
                            />
                        </div>
                        <div className={'col-9'}>
                            <p>
                                Don Phelix <span>Bitcoin Core Contributor</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={'mt-5'}>
                <h4>
                    <strong>Maintainers</strong>
                </h4>
                <hr />
                <div className={'d-flex justify-content-between'}>
                    <div className={'row'} style={custom.cardsContainer}>
                        <div className={'col-3'}>
                            <img
                                src={
                                    'https://mod.go.ke/wp-content/uploads/2021/04/default-profile-pic.png'
                                }
                                className="rounded-circle"
                                alt="Cinque Terre"
                                width="30"
                                height="30"
                            />
                        </div>
                        <div className={'col-9'}>
                            <p>
                                Don Phelix <span>Bitcoin Core Contributor</span>
                            </p>
                        </div>
                    </div>
                    <div className={'row'} style={custom.cardsContainer}>
                        <div className={'col-3'}>
                            <img
                                src={
                                    'https://mod.go.ke/wp-content/uploads/2021/04/default-profile-pic.png'
                                }
                                className="rounded-circle"
                                alt="Cinque Terre"
                                width="30"
                                height="30"
                            />
                        </div>
                        <div className={'col-9'}>
                            <p>
                                Don Phelix <span>Bitcoin Core Contributor</span>
                            </p>
                        </div>
                    </div>
                    <div className={'row'} style={custom.cardsContainer}>
                        <div className={'col-3'}>
                            <img
                                src={
                                    'https://mod.go.ke/wp-content/uploads/2021/04/default-profile-pic.png'
                                }
                                className="rounded-circle"
                                alt="Cinque Terre"
                                width="30"
                                height="30"
                            />
                        </div>
                        <div className={'col-9'}>
                            <p>
                                Don Phelix <span>Bitcoin Core Contributor</span>
                            </p>
                        </div>
                    </div>
                    <div className={'row'} style={custom.cardsContainer}>
                        <div className={'col-3'}>
                            <img
                                src={
                                    'https://mod.go.ke/wp-content/uploads/2021/04/default-profile-pic.png'
                                }
                                className="rounded-circle"
                                alt="Cinque Terre"
                                width="30"
                                height="30"
                            />
                        </div>
                        <div className={'col-9'}>
                            <p>
                                Don Phelix <span>Bitcoin Core Contributor</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={'mt-5'}>
                <h3>
                    <strong>Creator</strong>
                </h3>
                <div className={'d-flex justify-content-between'}>
                    <div className={'row'} style={custom.cardsContainer}>
                        <div className={'col-3'}>
                            <img
                                src={
                                    'https://mod.go.ke/wp-content/uploads/2021/04/default-profile-pic.png'
                                }
                                className="rounded-circle"
                                alt="Cinque Terre"
                                width="30"
                                height="30"
                            />
                        </div>
                        <div className={'col-9'}>
                            <p>
                                Don Phelix <span>Bitcoin Core Contributor</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

const custom = {
    tabStyle: {
        textTransform: 'capitalize',
        fontWeight: 'bold',
    },
    tabsContainer: {
        backgroundColor: 'rgb(68 63 63 / 50%)',
    },
    cardsContainer: {
        width: '200px',
        backgroundColor: 'rgb(68 63 63 / 50%)',
        borderRadius: '5px',
        marginLeft: '20px',
    },
};
