import axios from 'axios';

export const fetchMarketTable = () => {
    return (dispatch) => {
        axios
            .get(
                `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=35&page=1&sparkline=true`
            )
            .then((res) => {
                const data = res.data;
                dispatch({ type: 'FETCH_MARKET_TABLE', data });
            });
    };
};

export const fetchNewsTable = () => {
    return (dispatch) => {
        axios
            .get(`https://api.coingecko.com/api/v3/search/trending`)
            .then((res) => {
                const data = res.data;
                dispatch({ type: 'FETCH_NEWS_TABLE', data });
            });
    };
};

export const fetchGeneralTable = () => {
    return (dispatch) => {
        axios
            .get(
                `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=15&page=1&sparkline=true`
            )
            .then((res) => {
                const data = res.data;
                dispatch({ type: 'FETCH_GENERAL_TABLE', data });
            });
    };
};

export const fetchCategoryTable = () => {
    return (dispatch) => {
        axios
            .get(`https://api.coingecko.com/api/v3/coins/categories`)
            .then((res) => {
                const data = res.data;
                dispatch({ type: 'FETCH_CATEGORY_TABLE', data });
            });
    };
};

export const fetchCryptoTable = () => {
    return (dispatch) => {
        axios
            .get(
                `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true`
            )
            .then((res) => {
                const data = res.data;
                dispatch({ type: 'FETCH_CRYPTO_TABLE', data });
            });
    };
};

export const fetchGazingCoinDetails = () => {
    return (dispatch) => {
        axios
            .get(
                `https://api.coingecko.com/api/v3/coins/bitcoin?sparkline=true`
            )
            .then((res) => {
                const data = res.data;
                dispatch({ type: 'FETCH_GAZING_DETAIL', data });
            });
    };
};

export const fetchCryptoCoinDetails = (coin_id) => {
    return (dispatch) => {
        axios
            .get(
                `https://api.coingecko.com/api/v3/coins/${coin_id}?sparkline=true`
            )
            .then((res) => {
                const data = {
                    coin_id,
                    coin_info: res.data,
                };
                dispatch({ type: 'FETCH_CRYPTO_DETAIL', data });
            });
    };
};

export const fetchRecentTable = () => {
    return (dispatch) => {
        axios
            .get(
                `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,ripple,bitcoin-cash,bitcoin-cash-sv,litecoin,eos,tether,binancecoin,cardano,tezos,ethereum-classic,stellar,monero,tron,dash,chainlink,okb,iota,leo-token&order=market_cap_desc&sparkline=false`
            )
            .then((res) => {
                const data = res.data;
                dispatch({ type: 'FETCH_RECENT_TABLE', data });
            });
    };
};

export const fetchGazingTable = () => {
    return (dispatch) => {
        axios
            .get(
                `https://api.coingecko.com/api/v3/coins/list?localization=false&tickers=false&market_data=true&community_data=true&developer_data=true`
            )
            .then((res) => {
                const data = res.data;
                dispatch({ type: 'FETCH_GAZING_TABLE', data });
            });
    };
};

export const fetchTrendingTable = () => {
    return (dispatch) => {
        axios
            .get(`https://api.coingecko.com/api/v3/search/trending`)
            .then((res) => {
                const data = res.data?.coins;
                dispatch({ type: 'FETCH_TRENDING_TABLE', data });
            });
    };
};
