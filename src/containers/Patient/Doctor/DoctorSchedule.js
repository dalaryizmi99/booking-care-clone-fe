import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss';
import { FormattedMessage } from 'react-intl';
import localization from 'moment/locale/vi';
import { LANGUAGES } from '../../../utils';
import moment from 'moment';
import { getScheduleDoctorByDate } from '../../../services/userService';
import BookingModal from './Modal/BookingModal';

class DoctorSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvailableTime: [],
            isOpenModalBooking: false,
            dataBookingSchedule: {}
        }
    }

    async componentDidMount() {
        let { language } = this.props;
        let allDays = this.getArrDays(language);
        let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value)

        this.setState({
            allDays: allDays,
            allAvailableTime: res.data ? res.data : []
        })
    }

    getArrDays = (language) => {
        let allDays = []
        for (let i = 0; i < 7; i++) {
            //change i = 0 to i = 1:V
            let object = {};

            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    object.label = 'Hôm nay - ' + moment(new Date()).add(i, 'days').format('DD/MM');
                } else object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
            } else {
                if (i === 0) {
                    object.label = 'Today - ' + moment(new Date()).add(i, 'days').locale('en').format('DD/MM');
                } else object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            allDays.push(object);
        }

        return allDays;
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            let allDays = this.getArrDays(this.props.language);
            this.setState({
                allDays: allDays
            })
        }
        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let allDays = this.getArrDays(this.props.language);
            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value)
            this.setState({
                allAvailableTime: res.data ? res.data : []
            })
        }
    }

    handleOnChangeSelect = async (event) => {
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent;
            let date = event.target.value;
            let res = await getScheduleDoctorByDate(doctorId, date);

            if (res && res.errCode === 0) {
                this.setState({
                    allAvailableTime: res.data ? res.data : []
                })
            }
        }
    }

    handleShowModalBooking = (time) => {
        this.setState({
            isOpenModalBooking: !this.state.isOpenModalBooking,
            dataBookingSchedule: time
        })
    }

    closeModalBooking = () => {
        this.setState({
            isOpenModalBooking: !this.state.isOpenModalBooking
        })
    }

    render() {
        let { allDays, allAvailableTime, isOpenModalBooking, dataBookingSchedule } = this.state;
        let { language } = this.props;
        return (
            <>
                <div className='doctor-schedule-container'>
                    <div className='all-schedule'>
                        <select onChange={(event) => this.handleOnChangeSelect(event)}>
                            {allDays && allDays.length > 0 &&
                                allDays.map((item, index) => {
                                    return (
                                        <option value={item.value} key={index}>
                                            {item.label}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className='all-available-time'>
                        <div className='text-calendar'>
                            <i className='fas fa-calendar-alt'>
                                <span><FormattedMessage id='patient.detail-doctor.schedule' /></span>
                            </i>
                        </div>
                        <div className='time-content'>
                            {allAvailableTime && allAvailableTime.length > 0 ?
                                <>
                                    <div className='time-content-button'>
                                        {allAvailableTime.map((item, index) => {
                                            let timeDisplay = language === LANGUAGES.VI ?
                                                item.timeTypeData.valueVi : item.timeTypeData.valueEn;
                                            return (
                                                <button key={index}
                                                    className={language === LANGUAGES.VI ? 'btn-vi' : 'btn-en'}
                                                    onClick={() => this.handleShowModalBooking(item)}
                                                >
                                                    {timeDisplay}
                                                </button>
                                            )
                                        })
                                        }
                                    </div>
                                    <div className='book-fee'>
                                        <span>
                                            <FormattedMessage id='patient.detail-doctor.choose' />
                                            <i className='far fa-hand-point-up'></i>
                                            <FormattedMessage id='patient.detail-doctor.book-free' />
                                        </span>
                                    </div>
                                </>
                                :
                                <div className='schedule-desc'><FormattedMessage id='patient.detail-doctor.no-schedule' /></div>
                            }
                        </div>
                    </div>
                </div>
                <BookingModal
                    isOpenModalBooking={isOpenModalBooking}
                    closeModalBooking={this.closeModalBooking}
                    dataBookingSchedule={dataBookingSchedule}
                />
            </>

        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
