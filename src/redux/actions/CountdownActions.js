export const COUNTDOWN_SET_START = 'COUNTDOWN_SET_START';
export const COUNTDOWN_SET_END = 'COUNTDOWN_SET_END';
export const COUNTDOWN_SET_DURATION = 'COUNTDOWN_SET_DURATION';

export function setTimeStart(hours = 0, minutes = 0, seconds = 0){
    return (dispatch) => {
        dispatch({
            type: COUNTDOWN_SET_START,
            payload: {hours, minutes, seconds}
        });
    };
}

export function setTimeEnd(hours = 0, minutes = 0, seconds = 0){
    return (dispatch) => {
        dispatch({
            type: COUNTDOWN_SET_END,
            payload: {hours, minutes, seconds}
        });
    };
}

export function setDuration(start, end, duration = -1){
    return (dispatch) => {
        let startTime = new Date(0, 0, 0, start.hours, start.minutes, start.seconds),
            endTime = new Date(0, 0, 0, end.hours, end.minutes, end.seconds);
        
        dispatch({
            type: COUNTDOWN_SET_DURATION,
            payload: duration === -1 ? (endTime - startTime) / 1000 : duration
        });
    };
}