import React from 'react';
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <ul className='thread-list'>
        <label>Messages</label>
        <li>
          <Link to='/thread'>
            <i className='zmdi zmdi-account-circle'/>
            <h5>Name</h5>
            <p>this is the last message</p>
          </Link>
        </li>
        <li>
          <Link to='/thread'>
            <i className='zmdi zmdi-account-circle'/>
            <h5>Name</h5>
            <p>this is the last message</p>
          </Link>
        </li>
        <li>
          <Link to='/thread'>
            <i className='zmdi zmdi-account-circle'/>
            <h5>Name</h5>
            <p>this is the last message</p>
          </Link>
        </li>
        <li>
          <Link to='/thread'>
            <i className='zmdi zmdi-account-circle'/>
            <h5>Name</h5>
            <p>this is the last message</p>
          </Link>
        </li>
      </ul>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  chat: state.chat,
})

const mapDispatchToProps = dispatch => ({
})
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Sidebar));