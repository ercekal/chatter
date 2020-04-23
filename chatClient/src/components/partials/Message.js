import React from 'react';
import {connect, useStore} from 'react-redux'

const Message = ({auth, chat, msg}) => {
  console.log('msg: ', msg);
  return (
    <div className={`message-item ${msg.msg && msg.msg.userId === auth.user.id ? 'msg-right' : 'msg-left'}`}>
      <i className='zmdi zmdi-account-circle'/>
      <div className='chat-bubble'>
        {msg.msg.content}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  chat: state.chat,
})

const mapDispatchToProps = dispatch => ({
})
export default connect(mapStateToProps, mapDispatchToProps)(Message);