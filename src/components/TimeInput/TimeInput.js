import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TimeInput extends Component {
    constructor(props){
        super(props);
    }

    onChangeHandler(type, value){
        const VALIDATION = {
            TIMEINPUT: {
                HOURS: {
                    MAX_VALUE: 23,
                    MIN_VALUE: 0
                },
                MINUTES: {
                    MAX_VALUE: 59,
                    MIN_VALUE: 0
                },
                SECONDS: {
                    MAX_VALUE: 59,
                    MIN_VALUE: 0
                }
            }
        };

        let newTime = this.props.time;

        switch(type){
            case 'hours':
                if(value <= VALIDATION.TIMEINPUT.HOURS.MAX_VALUE && value >= VALIDATION.TIMEINPUT.HOURS.MIN_VALUE){
                    newTime[type] = value > 9 ? value.toString().replace(/^0+/, '') : `0${parseInt(value)}`;
                }
                break;
            case 'minutes':
                if(value <= VALIDATION.TIMEINPUT.MINUTES.MAX_VALUE && value >= VALIDATION.TIMEINPUT.MINUTES.MIN_VALUE){
                    newTime[type] = value > 9 ? value.toString().replace(/^0+/, '') : `0${parseInt(value)}`;
                }
                break;
            case 'seconds':
                if(value <= VALIDATION.TIMEINPUT.SECONDS.MAX_VALUE && value >= VALIDATION.TIMEINPUT.SECONDS.MIN_VALUE){
                    newTime[type] = value > 9 ? value.toString().replace(/^0+/, '') : `0${parseInt(value)}`;
                }
                break;
        }

        this.props.setTime(newTime.hours, newTime.minutes, newTime.seconds);
    }

    render(){
        let { hours, minutes, seconds } = this.props.time;
        
        return(
            <div className={`time-input ${this.props.type}`}>
                <input 
                    type="number" 
                    min="0" 
                    max="23" 
                    name={`${this.props.type}-hours`} 
                    id={`${this.props.type}-hours`} 
                    onChange={(e) => this.onChangeHandler('hours', e.target.value)}
                    value={hours}
                    disabled={this.props.mode !== 0}
                />
                <input 
                    type="number" 
                    min="0" 
                    max="59" 
                    name={`${this.props.type}-minutes`} 
                    id={`${this.props.type}-minutes`} 
                    onChange={(e) => this.onChangeHandler('minutes', e.target.value)}
                    value={minutes}
                    disabled={this.props.mode !== 0}
                />
                <input 
                    type="number" 
                    min="0" 
                    max="59" 
                    name={`${this.props.type}-seconds`}
                    id={`${this.props.type}-seconds`}
                    onChange={(e) => this.onChangeHandler('seconds', e.target.value)}
                    value={seconds}
                    disabled={this.props.mode !== 0}
                />
            </div>
        );
    }
}

TimeInput.propTypes = {
    type: PropTypes.string,
    time: PropTypes.object,
    mode: PropTypes.number,
    setTime: PropTypes.func
};

export default TimeInput;