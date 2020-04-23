import React, {useState} from 'react';
import {connect, useStore} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'

const Sidebar = ({chat, auth}) => {
  const [search, setSearch] = useState('')
  const onSearch = () => {
    chat.socket.send(JSON.stringify({
      type: 'SEARCH',
      data: search
    }))
  }

  const findOrCreateThread = (id) => {
    chat.socket.send(JSON.stringify({
      type: 'FIND_THREAD',
      data: [auth.user.id, id]
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
          className='btn btn-search'
          onClick={onSearch}><i className='zmdi zmdi-search' /></button>
      </div>
      {search ?
      <ul className='thread-list'>
      <label>Results</label>
      {chat.users.filter(u => u.id !== auth.user.id).map(user =>
        <li key={user.id}>
        <a onClick={e => {
          e.preventDefault()
          findOrCreateThread(user.id)
        }}>
          <i className='zmdi zmdi-account-circle'/>
          <h5>{user.username}</h5>
          <p>{user.email}</p>
        </a>
      </li>)}
      </ul>
      :
      <ul className='thread-list'>
        <label>Messages</label>
        {chat.threads.map((thread, i) => {
          return (
            <li key={i}>
              <Link to={`/${thread.id}`}>
                <i className='zmdi zmdi-account-circle'/>
                <h5>{thread.id}</h5>
                <p>this is the last message</p>
              </Link>
            </li>
          )
        })}
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