import React from 'react';
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'

const ThreadView = () => {
  return (
    <div className='main-view'>
      hello
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  chat: state.chat,
})

const mapDispatchToProps = dispatch => ({
})
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ThreadView));