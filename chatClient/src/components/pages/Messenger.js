import React from 'react';
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import SideBar from '../partials/Sidebar'
import ThreadView from '../partials/ThreadView'
import ChatInput from '../partials/ChatInput'

const Messenger = () => {
  return (
    <div className='messenger-container'>
      <SideBar />
      <ThreadView />
      <ChatInput />
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  chat: state.chat,
})

const mapDispatchToProps = dispatch => ({
})
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Messenger));