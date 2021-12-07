/* eslint-disable no-case-declarations */
const initialState = {
    marketTable: [],
    newsTable: [],
    generalTable: [],
    categoryTable: [],
    cryptoTable: [],
    recentTable: [],
    gazingTable: [],
    gazingDetail: {},
};

export default function cryptoReducer(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_MARKET_TABLE':
            return { ...state, marketTable: action.data };
        case 'FETCH_NEWS_TABLE':
            return { ...state, newsTable: action.data };
        case 'FETCH_GENERAL_TABLE':
            return { ...state, generalTable: action.data };
        case 'FETCH_CATEGORY_TABLE':
            return { ...state, categoryTable: action.data };
        case 'FETCH_CRYPTO_TABLE':
            return { ...state, cryptoTable: action.data };
        case 'FETCH_RECENT_TABLE':
            return { ...state, recentTable: action.data };
        case 'FETCH_GAZING_TABLE':
            return { ...state, gazingTable: action.data };
        case 'FETCH_GAZING_DETAIL':
            console.log('ftch gzng dtl: ', action.data);
            return { ...state, gazingDetail: action.data };
        default:
            return { ...state };
    }
}
