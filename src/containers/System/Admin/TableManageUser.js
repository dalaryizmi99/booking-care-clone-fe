import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./TableManageUser.scss";
import * as actions from '../../../store/actions';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}

class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usersRedux: []
        }
    }

    componentDidMount() {
        this.props.fetchUserRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.users !== this.props.users) {
            this.setState({
                usersRedux: this.props.users
            })
        }
    }

    handleDeleteUser = (user) => {
        this.props.deleteUserRedux(user.id);
    }

    handleEditUser = (user) => {
        console.log('user edit: ', user);
        this.props.handleEditUserFromParent(user)
    }

    render() {
        let arrUsers = this.state.usersRedux;
        return (
            <React.Fragment>
                <div className="users-container mx-3">
                    <table className="table table-hover table-light mt-3">
                        <thead>
                            <tr>
                                <th className='text-center' scope="col">#</th>
                                <th scope="col">Email</th>
                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">Address</th>
                                <th className="text-center" scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {arrUsers && arrUsers.length > 0 &&
                                arrUsers.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className='text-center' scope="row">{index + 1}</td>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td className="text-center btn-action">
                                                <div>
                                                    <button
                                                        onClick={() => this.handleEditUser(item)}
                                                        className="btn btn-outline-primary">Edit</button>
                                                </div>

                                                <div>
                                                    <button
                                                        onClick={() => this.handleDeleteUser(item)}
                                                        className="btn btn-outline-primary">Delete</button>
                                                </div>

                                            </td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                </div>

                <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        users: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteUserRedux: (id) => dispatch(actions.deleteUser(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
