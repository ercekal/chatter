import React, {useReducer, useState} from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

function Signup({socket}) {
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
    email: '',
    password: '',
    passwordAgain: '',
    name: '',
    username: ''
    }
  );
  const [error, setError] = useState('')
  const handleChange = evt => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setUserInput({[name]: newValue});
  }
  return (

      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='form-wrapper'>
              <h3>Signup</h3>
              <form
                onSubmit={e => {
                  e.preventDefault()
                  if(socket){
                    let empty = 0
                    Object.keys(userInput).map(key => {
                      if(userInput[key] === '') {
                        empty += 1
                      }
                    })
                    if (empty > 0) setError('All fields required')
                    if (userInput.password !== userInput.passwordAgain) setError('Passwords must match')
                    if (empty === 0) {
                      setError('')
                      socket.send(JSON.stringify({
                        type: 'SIGNUP',
                        data: {
                          email: userInput.email,
                          password: userInput.password,
                          name: userInput.name,
                          username: userInput.username,
                        }
                      }))
                    }
                  }
                }}
                >
              <p>Already have an account? <Link to='/login'>Login</Link> </p>
              {error !== '' && <p className='text-danger'>{error}</p>}
              <div className='row'>
                <div className='col-md-6'>
                 <div className='form-group'>
                    <label>Name</label>
                    <input
                      type='text'
                      name='name'
                      className='form-control'
                      onChange={handleChange}
                      value={userInput.name}
                      placeholder='Name' />
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='form-group'>
                    <label>Username</label>
                    <input
                      type='text'
                      name='username'
                      className='form-control'
                      onChange={handleChange}
                      value={userInput.username}
                      placeholder='Username' />
                  </div>
                  </div>
                </div>
              <div className='row'>
                <div className='col-md-6'>
                  <div className='form-group'>
                    <label>Email</label>
                    <input
                      type='email'
                      name='email'
                      className='form-control'
                      value={userInput.email}
                      onChange={handleChange}
                      placeholder='Email' />
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-md-6'>
                  <div className='form-group'>
                    <label>Password</label>
                    <input
                      type='password'
                      name='password'
                      className='form-control'
                      onChange={handleChange}
                      value={userInput.password}
                      placeholder='Password' />
                  </div>
                  </div>
                <div className='col-md-6'>
                  <div className='form-group'>
                    <label>Confirm Password</label>
                    <input
                      type='password'
                      name='passwordAgain'
                      className='form-control'
                      onChange={handleChange}
                      value={userInput.passwordAgain}
                      placeholder='Confirm Password' />
                  </div>
                </div>
              </div>
              <div className='text-center'>
                <button className='btn btn-primary' type='submit'>
                  Sign Up
                </button>
              </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Signup);