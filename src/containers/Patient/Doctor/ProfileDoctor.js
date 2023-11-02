import React, { Component } from 'react';
import { connect } from "react-redux";
import './ProfileDoctor.scss';
import { FormattedMessage } from 'react-intl';
import { getProfileDoctorById } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import NumberFormat from 'react-number-format';
import _ from 'lodash';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { Link } from 'react-router-dom';

class ProfileDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {}
        }
    }

    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.doctorId)
        this.setState({
            dataProfile: data
        })
    }

    getInforDoctor = async (id) => {
        let result = {}
        if (id) {
            let res = await getProfileDoctorById(id);
            if (res && res.errCode === 0) {
                result = res.data
            }
        }

        return result;
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
        if (this.props.doctorId !== prevProps.doctorId) {
            let data = await this.getInforDoctor(this.props.doctorId);
            this.setState({
                dataProfile: data,
            });
        }
    }

    renderTimeBooking = (dataBookingSchedule) => {
        let { language } = this.props;
        if (dataBookingSchedule && !_.isEmpty(dataBookingSchedule)) {
            let time = language === LANGUAGES.VI ?
                dataBookingSchedule.timeTypeData.valueVi
                : dataBookingSchedule.timeTypeData.valueEn

            let date = language === LANGUAGES.VI ?
                moment.unix(+dataBookingSchedule.date / 1000).format('dddd - DD/MM/YYYY')
                :
                moment.unix(+dataBookingSchedule.date / 1000).locale('en').format('ddd - MM/DD/YYYY')

            return (
                <>
                    <div className='time-booking'>{time} - {date}</div>
                    <div><FormattedMessage id='patient.booking-modal.free-booking' /></div>
                </>
            )
        }
        return <></>
    }

    render() {
        let { dataProfile } = this.state;
        let { doctorId, language, isShowDescDoctor, dataBookingSchedule, isShowLinkDetail, isShowPrice } = this.props;

        let nameVi = '', nameEn = '';
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.firstName} ${dataProfile.lastName}`;
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.lastName} ${dataProfile.firstName} `;
        }

        return (
            <div className='profile-doctor-container'>
                <div className='intro-doctor'>
                    <div
                        className='content-left'
                        style={{ backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})` }}
                    >
                    </div>

                    <div className='content-right'>
                        <div className='content-right-name'>
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                        </div>
                        <div className='content-right-desc'>
                            {isShowDescDoctor === true ?
                                <>
                                    {dataProfile.Markdown && dataProfile.Markdown.description
                                        && <span>{dataProfile.Markdown.description}</span>
                                    }
                                </>
                                :
                                <>{this.renderTimeBooking(dataBookingSchedule)}</>
                            }
                        </div>
                    </div>
                </div>

                {isShowLinkDetail === true &&
                    <div className='view-detail-doctor'>
                        <Link to={`/detail-doctor/${doctorId}`}>Xem thêm</Link>
                    </div>
                }

                {isShowPrice === true &&
                    <div className='price'>
                        <FormattedMessage id='patient.booking-modal.price' />
                        {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.VI
                            && <NumberFormat
                                value={dataProfile.Doctor_Infor.priceTypeData.valueVi}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'VNĐ.'}
                            />
                        }
                        {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.EN
                            && <NumberFormat
                                value={dataProfile.Doctor_Infor.priceTypeData.valueEn}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'USD.'}
                            />
                        }
                    </div>
                }
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
