import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import logo from '../../assets/logo.svg';
import { FormattedMessage } from 'react-intl';

class HomeHeader extends Component {

    render() {

        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className="fas fa-bars"></i>
                            <img src={logo} className='header-logo' />
                        </div>
                        <div className='center-content'>
                            <div className='child-center-content'>
                                <div><b><FormattedMessage id="home-header.specialty" /></b></div>
                                <div className='sub-titles'><FormattedMessage id="home-header.search-doctor" /></div>
                            </div>
                            <div className='child-center-content'>
                                <div><b><FormattedMessage id="home-header.health-facility" /></b></div>
                                <div className='sub-titles'><FormattedMessage id="home-header.select-room" /></div>
                            </div>
                            <div className='child-center-content'>
                                <div><b><FormattedMessage id="home-header.doctor" /></b></div>
                                <div className='sub-titles'><FormattedMessage id="home-header.choose-doctor" /></div>
                            </div>
                            <div className='child-center-content'>
                                <div><b><FormattedMessage id="home-header.service-package" /></b></div>
                                <div className='sub-titles'><FormattedMessage id="home-header.health-checks" /></div>
                            </div>

                        </div>
                        <div className='right-content'>
                            <div className='support'><i className="fas fa-question-circle"></i><FormattedMessage id="home-header.support" /></div>
                            <div className='language-vi'>VN</div>
                            <div className='language-en'>EN</div>
                        </div>
                    </div>
                </div>
                <div className='home-header-banner'>
                    <div className='title1'>
                        <FormattedMessage id="banner.title1" />
                    </div>
                    <div className='title2'>
                        <FormattedMessage id="banner.title2" />
                    </div>
                    <div className='search'>
                        <i className='fas fa-search'></i>
                        <input type='text' placeholder="Tìm" />
                    </div>
                    <div className='options'>
                        <div className='sub-options'>
                            <div className='option-icon-child'><i className='far fa-hospital'></i></div>
                            <div className='option-text-child'> <FormattedMessage id="banner.option-text-child-1" /></div>
                        </div>
                        <div className='sub-options'>
                            <div className='option-icon-child'><i className='far fa-hospital'></i></div>
                            <div className='option-text-child'> <FormattedMessage id="banner.option-text-child-2" /></div>
                        </div>
                        <div className='sub-options'>
                            <div className='option-icon-child'><i className='far fa-hospital'></i></div>
                            <div className='option-text-child'> <FormattedMessage id="banner.option-text-child-3" /></div>
                        </div>
                        <div className='sub-options'>
                            <div className='option-icon-child'><i className='far fa-hospital'></i></div>
                            <div className='option-text-child'> <FormattedMessage id="banner.option-text-child-4" /></div>
                        </div>
                        <div className='sub-options'>
                            <div className='option-icon-child'><i className='fas fa-flask'></i></div>
                            <div className='option-text-child'> <FormattedMessage id="banner.option-text-child-5" /></div>
                        </div>
                        <div className='sub-options'>
                            <div className='option-icon-child'><i className='fas fa-briefcase-medical'></i></div>
                            <div className='option-text-child'> <FormattedMessage id="banner.option-text-child-6" /></div>
                        </div>
                    </div>
                </div>
            </React.Fragment>

        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
