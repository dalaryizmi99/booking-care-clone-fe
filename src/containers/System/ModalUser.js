import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';

class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            gender: '',
            roleId: ''
        }

        this.listenToEmitter();
    }

    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
                phoneNumber: '',
                gender: '',
                roleId: ''
            })
        })
    }

    toggle = () => {
        this.props.toggleFromParent();
    }

    handleOnChangeInput = (event, id) => {

        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        });
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address', 'phoneNumber', 'gender', 'roleId']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing Parameter: ' + arrInput[i])
                break;
            }
        }
        return isValid;
    }

    handleAddNewUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            this.props.createNewUser(this.state);
        }

    }

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                className={'modal-user-container modal-lg'}
            >
                <ModalHeader toggle={() => this.toggle()}>Add a new user</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className="input-container">
                            <label>Email</label>
                            <input type="email"
                                className="form-control"
                                placeholder="Email"
                                onChange={(event) => { this.handleOnChangeInput(event, 'email') }}
                                value={this.state.email} />
                        </div>
                        <div className="input-container">
                            <label>Password</label>
                            <input type="password"
                                className="form-control"
                                value={this.state.password}
                                placeholder="Password"
                                onChange={(event) => { this.handleOnChangeInput(event, 'password') }} />
                        </div>

                        <div className="input-container">
                            <label>First Name</label>
                            <input type="text"
                                className="form-control"
                                value={this.state.firstName}
                                placeholder="First Name"
                                onChange={(event) => { this.handleOnChangeInput(event, 'firstName') }} />
                        </div>
                        <div className="input-container">
                            <label>Last Name</label>
                            <input type="text"
                                className="form-control"
                                value={this.state.lastName}
                                placeholder="Last Name"
                                onChange={(event) => { this.handleOnChangeInput(event, 'lastName') }} />
                        </div>

                        <div className="input-container max-width-input">
                            <label>Address</label>
                            <input type="text"
                                className="form-control"
                                value={this.state.address}
                                placeholder="1234 Main St"
                                onChange={(event) => { this.handleOnChangeInput(event, 'address') }} />
                        </div>

                        <div className="input-container max-width-input">
                            <label>Phone Number</label>
                            <input type="text"
                                className="form-control"
                                value={this.state.phoneNumber}
                                onChange={(event) => { this.handleOnChangeInput(event, 'phoneNumber') }} />
                        </div>
                        <div className="input-container">
                            <label>Sex</label>
                            <select value={this.state.gender}
                                className="form-control"
                                onChange={(event) => { this.handleOnChangeInput(event, 'gender') }}>
                                <option value="">-----------</option>
                                <option value="0">Male</option>
                                <option value="1">Female</option>
                            </select>
                        </div>
                        <div className="input-container">
                            <label>Role</label>
                            <select value={this.state.roleId}
                                className="form-control"
                                onChange={(event) => { this.handleOnChangeInput(event, 'roleId') }}>
                                <option value="">-----------</option>
                                <option value="1">Admin</option>
                                <option value="2">Doctor</option>
                                <option value="3">Position</option>
                            </select>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button className='px-3'
                        color="primary"
                        onClick={() => this.handleAddNewUser()}>
                        Create
                    </Button>
                    <Button className='px-3' color="secondary" onClick={() => this.toggle()}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
