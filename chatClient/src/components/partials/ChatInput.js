import React, {useState} from 'react';
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'

const ChatInput = () => {
  const [content, setContent] = useState('')
  return (
    <div className='input-view'>
      <input
        type='text'
        placeholder='Write your message'
        className='form-control'
        onChange={e => setContent(e.target.value)}
        value={content}/>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  chat: state.chat,
})

const mapDispatchToProps = dispatch => ({
})
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ChatInput));