import React, {useState} from 'react';
import {connect, useStore} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'

const Sidebar = ({chat, users}) => {
  const [search, setSearch] = useState('')
  const onSearch = () => {
    chat.socket.send(JSON.stringify({
      type: 'SEARCH',
      data: search
    }))
  }
  return (
    <div className='sidebar'>
      <div className='search-container'>
        <input
          className='form-control'
          placeholder='search...'
          value={search}
          onChange={e => setSearch(e.target.value)}
          />
          <button
          className='btn btn-primary'
          onClick={onSearch}>Search</button>
      </div>
      {search ?
      <ul className='thread-list'>
      <label>Results</label>
      {chat.users.map(user =>
        <li key={user.id}>
        <Link to='/thread'>
          <i className='zmdi zmdi-account-circle'/>
          <h5>{user.username}</h5>
          <p>{user.email}</p>
        </Link>
      </li>)}
      </ul>
      :
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
    }
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