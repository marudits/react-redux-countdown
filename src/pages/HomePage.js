import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Redux
import * as countdownActions from '../redux/actions/CountdownActions';

// Component
import TimeInput from '../components/TimeInput/TimeInput';
import { setInterval, clearInterval } from 'timers';

class HomePage extends Component {
    constructor(props){
        super(props);

        this.state = {
            mode: 0,
            validation: null,
            progress: 0
        };

        this.timer = null;
    }

    getProgress(start, end, duration){
        let startTime = new Date(0, 0, 0, start.hours, start.minutes, start.seconds),
            endTime = new Date(0, 0, 0, end.hours, end.minutes, end.seconds),
            total = (endTime - startTime) / 1000,
            progress = parseInt((duration / total) * 100);
        return progress;
    }

    formatDurationToTime(duration){
        let hours = parseInt(duration / (60 * 60)),
            minutes = parseInt((duration - (hours * 60 * 60)) / 60),
            seconds = (duration - (hours * 60 * 60) - (minutes * 60));

        return `${hours > 9 ? hours : `0${hours}`}:${minutes > 9 ? minutes : `0${minutes}`}:${seconds > 9 ? seconds : `0${seconds}`}`;
    }

    startTimer(){
        this.setMode(2);

        let { time } = this.props.countdown,
            that = this;
        
        this.timer = setInterval(function(){
            that.setState({progress: that.getProgress(time.start, time.end, that.props.countdown.duration - 1)});
            if(that.props.countdown.duration > 1){
                that.props.countdownActions.setDuration(time.start, time.end, (that.props.countdown.duration - 1));
            } else {
                that.props.countdownActions.setDuration(time.start, time.end, 0);
                that.resetCountdown();
            }
        }, 1000);
    }

    setTimer(){
        if(this.validateTimeInput()){
            this.props.countdownActions.setDuration(this.props.countdown.time.start, this.props.countdown.time.end);
            this.setMode(1);
            this.setState({progress: 100});
        }
    }

    stopTimer(){
        clearInterval(this.timer);
        this.setMode(0);
        this.setState({progress: 0});
    }
    
    setMode(mode){
        this.setState({mode: mode});
    }

    setProgressColor(percentage){
        if(percentage >= 0 && percentage < 20){
            return 'danger';
        } else if(percentage < 40){
            return 'warning';
        } else {
            return 'success';
        }
    }

    resetCountdown(){
        clearInterval(this.timer);
        this.setMode(0);
        this.setState({progress: 0});
        this.props.countdownActions.setTimeStart('00', '00', '00');
        this.props.countdownActions.setTimeEnd('00', '00', '00');
        this.props.countdownActions.setDuration(this.props.countdown.time.start, this.props.countdown.time.end, 0);
    }

    validateTimeInput(){
        let { start, end } = this.props.countdown.time,
            startTime = new Date(0, 0, 0, start.hours, start.minutes, start.seconds),
            endTime = new Date(0, 0, 0, end.hours, end.minutes, end.seconds);

        // if diff 0 seconds
        if((endTime - startTime) === 0){
            this.setState({validation: 'Duration should be more than 0 second'});
            return false;
        // check is overlap
        } else if((endTime - startTime) < 0){
            this.setState({validation: 'End Time should be greater than Start Time'});
            return false;
        } else {
            this.setState({validation: null});
            return true;
        }
    }

    render(){
        return(
            <main>
                <div className="jumbotron jumbotron-fluid text-dark bg-light animated fadeIn">
                    <div className=" text-center time-countdown">
                        <h1>{this.formatDurationToTime(this.props.countdown.duration)}</h1>
                        <div className="progress bg-light" style={{height: '5px'}}>
                            <div className={`progress-bar progress-bar-striped progress-bar-animated bg-${this.setProgressColor(this.state.progress)}`} role="progressbar" style={{width: `${this.state.progress}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>
                    <div className="text-center time-input">
                        <div className="row time-input__item start">
                            <h3>Start</h3>
                            <TimeInput 
                                type="start" 
                                time={this.props.countdown.time.start}
                                mode={this.state.mode}
                                setTime={this.props.countdownActions.setTimeStart}
                            />
                        </div>
                        <div className="row time-input__item end">
                            <h3>End</h3>
                            <TimeInput 
                                type="end"
                                time={this.props.countdown.time.end} 
                                mode={this.state.mode}
                                setTime={this.props.countdownActions.setTimeEnd}
                            />
                        </div>
                        <div className="row time-input__validation">
                            <p>{this.state.validation}</p>
                        </div>
                    </div>
                    {
                        (() => {
                            switch(this.state.mode){
                                case 0:
                                    return(
                                        <div className="text-center btn-action">
                                            <button type="button" className="btn btn-md btn-primary btn-set" onClick={() => this.setTimer()}>Set</button>
                                        </div>
                                    );
                                case 1:
                                    return(
                                        <div className="text-center btn-action">
                                            <button type="button" className="btn btn-md btn-outline-secondary btn-cancel" onClick={() => this.stopTimer()}>Cancel</button>
                                            <button type="button" className="btn btn-md btn-success btn-start" onClick={() => this.startTimer()} disabled={this.state.mode === 2}>Start</button>
                                        </div>
                                    );
                                case 2:
                                    return(
                                        <div className="text-center btn-action">
                                            <button type="button" className="btn btn-md btn-danger btn-stop" onClick={() => this.resetCountdown()}>Stop</button>
                                        </div>
                                    );
                            }
                        })()        
                    }
                </div>
            </main>
        );
    }
}

HomePage.propTypes = {
    countdown: PropTypes.object,
    countdownActions: PropTypes.object
};

function mapStateToProps(state){
    return {
        countdown: state.countdown
    };
}

function mapDispatchToProps(dispatch){
    return {
        countdownActions: bindActionCreators(countdownActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);