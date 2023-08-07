import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import './App.css';
import  io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { initMessages, sendMessage, sendName, typingMessage } from './store/chatReducer';
import { useSelector } from 'react-redux';
import { AppStore } from './store/store';

//const socket = io('http://localhost:3020')


function App() {

  type User = {
    user: {id: string, name: string}
    message: string
  }

  const dispatch = useDispatch<any>()

  useEffect(() => {
    /* socket.on('init-messages', (messages: any) => {      
      setUsers(messages)
    })

    socket.on('notify-about-newMessage', (message: any) => {      
      setUsers((users) => [...users, message]);
    }) */
    dispatch(initMessages())
    
    
  }, [])


  const users = useSelector((state: AppStore) => state.messages)
  const typingUSers = useSelector((state: AppStore) => state.typingUsers)

  const [messageValue, setMessageValue] = useState('')
  const [nameValue, setNameValue] = useState('')

  const bottomRef = useRef(null);
  

  const onMessageChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setMessageValue(e.currentTarget.value)
  }
  const onNameChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setNameValue(e.currentTarget.value)
  }

  const sendMessageHandler = (): void => {
    //socket.emit('client-message-sent', messageValue);
    dispatch(sendMessage(messageValue))
    setMessageValue('')
  }

  const sendNameMessage = (): void => {
    //socket.emit('client-name-sent', nameValue);
    dispatch(sendName(nameValue))
    setNameValue('')
  }



  return (
    <div className="App">
       <div className="chat">
        <div className="messages">

        {users?.map((el:any, i:any) => <div className="message" key={i}>
            <img src='http://via.placeholder.com/50x50'/>
             <b>{el.user.name}</b> <span>{el.message}</span>
          </div>)
          }

          <ol>
            {typingUSers.map(el => {
              return <li>{el.name} is typing...</li>
            })}
          </ol>
        </div>

        <div ref={bottomRef} />

      </div>

      <div className="footer">
        <div>
      <textarea placeholder='Message'
      onKeyPress={() => dispatch(typingMessage())}
      onChange={onMessageChange} value={messageValue}/>
      <button onClick={sendMessageHandler}>Send message</button>
      </div>
      <div>
      <textarea placeholder='Name' onChange={onNameChange} value={nameValue}/>
          <button onClick={sendNameMessage}>Send name</button>
          </div>
        </div>
    </div>
  );
}

export default App;
