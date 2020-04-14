import React, { useEffect } from 'react'
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as ChatActions from './store/actions/chatActions'
import Auth from './components/pages/Auth'

function App ({ setupSocket, socket }) {
  useEffect(() => {
    setupSocket()
  }, [])
  return (
    <div className='App'>
      {console.log('socket: ', socket)}
      <button onClick={e => {
        e.preventDefault()
        if(socket) {
          socket.send(JSON.stringify(
            {
              type: 'Hello',
              data: 'world'
            }
          ))
        }
      }}>Send Msg</button>
      <BrowserRouter>
        <Switch>
          <Route
            path='/login'
            render={Auth}
          />
          <Route
            path='/signup'
            render={Auth}
          />
          <Route
            path='/'
            render={props => {
              console.log('props: ', props);
              if (!this.props.token) {
                return (
                  <Redirect to='/login' />
                )
              } else {
                return (
                  <h1>Root</h1>
                )
              }
            }}
          />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

const mapStateToProps = state => ({
  ...state.auth,
  ...state.chat
})

const mapDispatchToProps = dispatch => ({
  setupSocket: () => {
    dispatch(ChatActions.setupSocket())
  }
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
