import React, { useEffect, Component } from 'react'
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as ChatActions from './store/actions/chatActions'
import * as AuthActions from './store/actions/authActions'
import Auth from './components/pages/Auth'
import Messenger from './components/pages/Messenger'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/css/swag.css'

const App = ({logout, auth, setupSocket, chat}) => {

  useEffect(() => {
    setupSocket()
  }, []);

  return (
    <div className='App'>
      <button onClick={e => logout()}>
        Log out
      </button>
      <BrowserRouter>
        <Switch>
          <Route
            path='/login'
            render={props => {
              if(auth.token) {
                return <Redirect to='/' />
              } else {
                return <Auth />
              }
            }}
          />
          <Route
            path='/signup'
            render={props => {
              if(auth.token) {
                return <Redirect to='/' />
              } else {
                return <Auth />
              }
            }}
          />
          <Route
            path='/:threadId'
            render={props => {
              if (!auth.token) {
                return (
                  <Redirect to='/login' />
                )
              } else {
                return (
                  <Messenger />
                )
              }
            }}
          />
          <Route
            path='/'
            render={props => {
              if (!auth.token) {
                return (
                  <Redirect to='/login' />
                )
              } else {
                return (
                  <Messenger />
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
  auth: state.auth,
  chat: state.chat,
})

const mapDispatchToProps = dispatch => ({
  setupSocket: () => {
    dispatch(ChatActions.setupSocket())
  },
  logout: () => {
    dispatch(AuthActions.logout())
  }
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
