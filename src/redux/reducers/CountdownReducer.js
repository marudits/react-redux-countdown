import {
    COUNTDOWN_SET_START,
    COUNTDOWN_SET_END,
    COUNTDOWN_SET_DURATION
} from '../actions/CountdownActions';

const initialState = {
    time: {
        start: {
            hours: '00',
            minutes: '00',
            seconds: '00'
        },
        end: {
            hours: '00',
            minutes: '00',
            seconds: '00'
        }
    },
    duration: 0
};

export const CountdownReducer = (state = initialState, action) => {
    switch(action.type){
        case COUNTDOWN_SET_START:
            return {
                ...state,
                time: {
                    ...state.time,
                    start: { 
                        ...action.payload
                    }
                }
            };
        case COUNTDOWN_SET_END:
            return {
                ...state,
                time: {
                    ...state.time,
                    end: { 
                        ...action.payload
                    }
                }
            };
        case COUNTDOWN_SET_DURATION:
            return {
                ...state,
                duration: action.payload
            };
        default:
            return state;
    }
};