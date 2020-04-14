import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class Login extends Component {
  render() {
    return (
      <div className='form-wrapper'>
        <h3>Login</h3>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.auth,
  ...state.chat,
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Login);