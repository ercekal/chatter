import React, {useReducer} from 'react';
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
  const handleChange = evt => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setUserInput({[name]: newValue});
  }
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6'>
          <div className='form-wrapper'>
            <h3>Signup</h3>
            <p>Already have an account? <Link to='/login'>Login</Link> </p>
            <form
              onSubmit={e => {
                e.preventDefault()
                if(socket){
                  socket.send(JSON.stringify({
                    type: 'SIGNUP',
                    data: {
                      email: userInput.email,
                      password: userInput.password
                    }
                  }))
                }
              }

              }
              >
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
              <div className='form-group'>
                <label>Password</label>
                <input
                  type='password'
                  className='form-control'
                  onChange={handleChange}
                  value={userInput.password}
                  placeholder='Password' />
              </div>
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
              <button className='btn btn-primary' type='submit'>
                Sign Up
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

export default connect(mapStateToProps, mapDispatchToProps)(Signup);