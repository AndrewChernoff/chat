import { Dispatch } from "redux"
import { api } from "../DAL/services"

type Message = {
    user: {id: string, name: string}
    message: string
  }

type StateType = {
    messages: Message[]
    typingUsers: any[]
}

const initialState: StateType = {
    messages: [],
    typingUsers: []
  };
  
  export  const chatReducer = (state = initialState, action:any) => {
    switch (action.type) {
      case 'init-messages':
        return {
          ...state,
          messages: action.messages,
        };
  
      case 'notify-about-newMessage':
        return {
          ...state,
          messages: [...state.messages, action.messageItem],
          typingUsers: state.typingUsers.filter((user:any) => user.id !== action.messageItem.id)
        };

      case 'get-user-typing':
        return {
          ...state,
          typingUsers: [...state.typingUsers.filter((user:any) => user.id !== action.user.id), action.user],
        };
      default:
        return state;
    }
  };
  

const getMessages = (messages: Message[]) => ({type:'init-messages', messages})
const getNewMessage = (messageItem: Message) => ({type:'notify-about-newMessage', messageItem})
const getTypingUser = (user: any) => ({type:'get-user-typing', user})

export const initMessages = () => (dispatch: any) => {
    api.socketConnect()
        api.subscribe((messages: any) => {
            dispatch(getMessages(messages))
        }, 
        (message: any) => {
            dispatch(getNewMessage(message))
            },
            (user: any) => {
              dispatch(getTypingUser(user))
              }
        )
}

export const sendName = (name: string) => () => {
  api.nameSent(name)
}

export const sendMessage = (message: string) => () => {
  api.messageSent(message)
}

export const typingMessage = () => () => {
  api.userIsTyping()
}
