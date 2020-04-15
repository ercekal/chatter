import React, { useEffect, Component } from 'react'
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as ChatActions from './store/actions/chatActions'
import * as AuthActions from './store/actions/authActions'
import Auth from './components/pages/Auth'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/css/swag.css'

class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.setupSocket()
  }
  render() {
    return (
      <div className='App'>
        <button onClick={e => this.props.logout()}>
          Log out
        </button>
        <BrowserRouter>
          <Switch>
            <Route
              path='/login'
              render={props => {
                if(this.props.auth.token) {
                  return <Redirect to='/' />
                } else {
                  return <Auth />
                }
              }}
            />
            <Route
              path='/signup'
              render={props => {
                if(this.props.auth.token) {
                  return <Redirect to='/' />
                } else {
                  return <Auth />
                }
              }}
            />
            <Route
              path='/'
              render={props => {
                if (!this.props.auth.token) {
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
