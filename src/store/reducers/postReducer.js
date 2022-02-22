const initialState = {
    list: [],
    trending: [],
    users: [],
    comments: {},
    feed: {
        posts: [],
        hasMore: null,
    },
};

export default function postReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOAD_SCROLLS':
            return { ...state, list: action.scrolls };
        case 'LOAD_FEED':
            return { ...state, feed: action.feed };
        case 'LOAD_TRENDING':
            return { ...state, trending: action.trending };
        case 'LOAD_USERS':
            return { ...state, users: action.users };
        case 'LOAD_COMMENTS':
            return {
                ...state,
                comments: {
                    ...state['comments'],
                    [action.commentsData.scrollId]:
                        action.commentsData.comments,
                },
            };
        default:
            return { ...state };
    }
}
