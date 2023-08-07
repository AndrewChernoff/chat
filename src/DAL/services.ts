import { Socket, io } from "socket.io-client";




export const api = {
    socket: null as null | Socket,

    socketConnect() {
        this.socket = io('http://localhost:3020') 
    },

    socketDisconnect() {
        this.socket?.disconnect()
        this.socket = null
    },

    subscribe(initMessagesHandler:(messages: any) => void,
        newMessageHandler:(message: any) => void,
        getTypingUser: (user:any) => void) {
            this.socket?.on('init-messages', initMessagesHandler)
            this.socket?.on('notify-about-newMessage', newMessageHandler)
            this.socket?.on('user-typing', getTypingUser)
    },

    messageSent(message: string) {
        this.socket?.emit('client-message-sent', message)
    },

    nameSent(name: string) {
        this.socket?.emit('client-name-sent', name, (error: string) => {
            if(error) alert(error)
        });
    },

    userIsTyping() {
        this.socket?.emit('user-typed');
    },
}