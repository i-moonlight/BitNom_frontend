const initialState = {
    eventCount: null,
};

export default function eventCountReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_EVENT_COUNT':
            return { ...state, eventCount: action.eventCount };
        default:
            return { ...state };
    }
}
