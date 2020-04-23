import React, {useEffect, useRef} from 'react';
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'

const ThreadView = ({match, chat}) => {
  useEffect(() => {
    init()
  }, [])
  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  const init = () => {
    let currentThread = chat.threads.filter(t => t.id === match.params.threadId)[0]
    if(currentThread) {
      let skip = currentThread.Messages || 0;
      (chat.socket.readyState &&
      chat.socket.send(JSON.stringify({
        type: 'THREAD_LOAD',
        data: {
          threadId: match.params.threadId,
          skip: skip
        }
      })))
    }
  }

  const prevParams = usePrevious({match});
    useEffect(() => {
      if(prevParams && (prevParams.match.params.threadId  !== match.params.threadId)) {
        init()
      }
    }, [match])

  return (
    <div className='main-view'>
      hello
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  chat: state.chat,
})

const mapDispatchToProps = dispatch => ({
})
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ThreadView));