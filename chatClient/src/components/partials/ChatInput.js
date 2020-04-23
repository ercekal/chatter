import React, {useState} from 'react';
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'

const ChatInput = ({match, auth, chat, socket}) => {
  const [content, setContent] = useState('')
  const sendMessage = (e) => {
    e.preventDefault()
    const msg = {
      threadId: match.params.threadId,
      userId: auth.user.id,
      content: content,
      date: new Date()
    }
    chat.socket.send(JSON.stringify({
      type: 'ADD_MESSAGE',
      data: {
        threadId: msg.threadId,
        msg: msg
      }
    }))
    setContent('')
  }
  return (
    <form className='input-view-chat' onSubmit={e => sendMessage(e)}>
      <div className='input-group'>
        <input
          type='text'
          placeholder='Write your message'
          className='form-control'
          onChange={e => setContent(e.target.value)}
          value={content}/>
          <button className='btn btn-send input-group-append'><i className='zmdi zmdi-mail-send'/></button>
      </div>
    </form>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  chat: state.chat,
})

const mapDispatchToProps = dispatch => ({
})
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ChatInput));