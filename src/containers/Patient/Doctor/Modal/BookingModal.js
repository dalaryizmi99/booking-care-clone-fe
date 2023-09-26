import React, { Component } from 'react';
import { connect } from "react-redux";
import './BookingModal.scss';
import { FormattedMessage } from 'react-intl';
import { Button, Modal, ModalHeader } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions'
import { LANGUAGES } from '../../../../utils';
import Select from 'react-select';
import { postPatientAppointment } from '../../../../services/userService';
import { Toast, toast } from 'react-toastify';

class BookingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthDay: '',
            seletedGender: '',
            doctorId: '',
            genders: '',
            timeType: '',
        }
    }

    async componentDidMount() {
        this.props.getGenders()
    }

    buildDataGender = (data) => {
        let result = [];
        let language = this.props.language;

        if (data && data.length > 0) {
            data.map(item => {
                let object = {};
                object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                object.value = item.keyMap;
                result.push(object)
            })
        }
        return result;
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }

        if (this.props.genders !== prevProps.genders) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }

        if (this.props.dataBookingSchedule !== prevProps.dataBookingSchedule) {
            let doctorId = this.props.dataBookingSchedule && !_.isEmpty(this.props.dataBookingSchedule)
                ? this.props.dataBookingSchedule.doctorId : '';
            let timeType = this.props.dataBookingSchedule.timeType;
            this.setState({
                doctorId: doctorId,
                timeType: timeType
            })
        }
    }


    handleOnChangeInput = (event, id) => {
        let valueInput = event.target.value;
        let stateCopy = { ...this.state };
        stateCopy[id] = valueInput;
        this.setState({
            ...stateCopy
        })
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            birthDay: date[0]
        })
    }

    handleChangeSelectGender = (selectedOption) => {
        this.setState({
            seletedGender: selectedOption
        });
    }

    handleConfirmBooking = async () => {
        //validate input
        //!data.email || !data.doctorId || !data.timeType || !data.date
        let date = new Date(this.state.birthDay).getTime();

        let res = await postPatientAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: date,
            seletedGender: this.state.seletedGender.value,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
        })

        if (res && res.errCode === 0) {
            toast.success('Booking a new appointment successful!')
            this.props.closeModalBooking();
        } else {
            toast.error('Not success!')
        }
    }

    render() {
        let { isOpenModalBooking, closeModalBooking, dataBookingSchedule } = this.props;
        let doctorId = dataBookingSchedule && !_.isEmpty(dataBookingSchedule) ? dataBookingSchedule.doctorId : '';

        return (
            <Modal isOpen={isOpenModalBooking}
                className={'booking-modal-container'}
                centered
                size='lg'>
                <div className='booking-modal-content'>
                    <div className='booking-modal-header'>
                        <span className='left'><FormattedMessage id='patient.booking-modal.title-modal' /></span>
                        <span className='right'
                            onClick={closeModalBooking}>
                            <i className='fas fa-times'></i>
                        </span>
                    </div>
                    <div className='booking-modal-body'>
                        {/* {JSON.stringify(dataBookingSchedule)} */}
                        <div className='doctor-infor'>
                            <ProfileDoctor
                                doctorId={doctorId}
                                isShowDescDoctor={false}
                                dataBookingSchedule={dataBookingSchedule}
                            />
                        </div>

                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='patient.booking-modal.full-name' /></label>
                                <input className='form-control'
                                    value={this.state.fullName}
                                    onChange={(event) => this.handleOnChangeInput(event, 'fullName')}
                                />
                            </div>
                            <div className='col-3 form-group'>
                                <label><FormattedMessage id='patient.booking-modal.birth-day' /></label>
                                <DatePicker className='form-control'
                                    value={this.state.birthDay}
                                    onChange={this.handleOnChangeDatePicker}
                                />
                            </div>
                            <div className='col-3 form-group'>
                                <label><FormattedMessage id='patient.booking-modal.sex' /></label>
                                <Select
                                    value={this.state.seletedGender}
                                    onChange={this.handleChangeSelectGender}
                                    options={this.state.genders}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='patient.booking-modal.phone-number' /></label>
                                <input className='form-control'
                                    value={this.state.phoneNumber}
                                    onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='patient.booking-modal.email' /></label>
                                <input className='form-control'
                                    value={this.state.email}
                                    onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                />
                            </div>
                            <div className='col-12 form-group'>
                                <label><FormattedMessage id='patient.booking-modal.address' /></label>
                                <input className='form-control'
                                    value={this.state.address}
                                    onChange={(event) => this.handleOnChangeInput(event, 'address')} />
                            </div>
                            <div className='col-12 form-group'>
                                <label><FormattedMessage id='patient.booking-modal.reason' /></label>
                                <input className='form-control'
                                    value={this.state.reason}
                                    onChange={(event) => this.handleOnChangeInput(event, 'reason')} />
                            </div>

                        </div>
                    </div>
                    <div className='booking-modal-footer'>
                        <button className='btn-booking-confirm'
                            onClick={() => this.handleConfirmBooking()}>
                            <FormattedMessage id='patient.booking-modal.confirm' />
                        </button>
                        <button className='btn-booking-cancel'
                            onClick={closeModalBooking}>
                            <FormattedMessage id='patient.booking-modal.cancel' />
                        </button>
                    </div>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenders: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
