import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

class About extends Component {

    render() {

        return (
            <div className="section-share section-about">
                <div className='section-about-header'>
                    Truyền thông nói gì về chúng tôi:
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                        <iframe width="100%" height="400px"
                            src="https://www.youtube.com/embed/B_K6z3HiRAs?list=RDB_K6z3HiRAs"
                            title="Joan Baez ~ 500 Miles"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen>
                        </iframe>
                    </div>
                    <div className='content-right'>
                        <div>
                            <p>
                                "Ai Là Kẻ Sát Nhân - Longing for You kể về câu chuyện khi cậu em trai Jin Woo trở thành nghi phạm giết người,
                                thanh tra Jin Seong gia nhập đội điều tra để tìm hiểu chân tướng.
                                Nỗi oan được sáng tỏ, hung thủ bị vạch trần, nhưng rồi Jin Woo lại bị giết chết trong một đêm mưa gió.
                                Jin Seong một lần nữa lao vào cuộc săn lùng kẻ giết người trong lúc phải đối mặt với những bí mật bị chôn giấu của chính gia đình mình."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
