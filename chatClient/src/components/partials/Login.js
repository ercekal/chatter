import React, {useState} from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

function Login({socket}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-12'>
          <div className='form-wrapper'>
            <h3>Login</h3>
            <form
              onSubmit={e => {
                e.preventDefault()
                if(socket){
                  socket.send(JSON.stringify({
                    type: 'LOGIN',
                    data: {
                      email,
                      password
                    }
                  }))
                }
              }}
              >
                <p>Don't have an account? <Link to='/signup'>Sign up</Link> </p>
              <div className='form-group'>
                <label>Email</label>
                <input
                  type='email'
                  className='form-control'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder='Email' />
              </div>
              <div className='form-group'>
                <label>Password</label>
                <input
                  type='password'
                  className='form-control'
                  onChange={e => setPassword(e.target.value)}
                  value={password}
                  placeholder='Password' />
              </div>
              <button className='btn btn-primary' type='submit'>
                LOGIN
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  ...state.auth,
  ...state.chat
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Login);