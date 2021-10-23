import { api } from '../../services/api'

import styles from './styles.module.scss'
import logoImage from '../../assets/logo.svg'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'

type Message = {
  id: string;
  text: string;
  user: {
    name: string;
    avatar_url: string;
  }

}

const messageList: Message[] = []

const socket = io("http://localhost:4000");

socket.on("new_message", (newMessage: Message) => {
  messageList.push(newMessage)
})

export function MessageList() {

  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    const timer = setInterval(() => {
      if (messageList.length > 0) {
        setMessages(prevState => [
          messageList[0],
          prevState[0],
          prevState[1]
        ].filter(Boolean))
        messageList.shift()
      }
    }, 3000)
  }, [])

  useEffect(() => {
    api.get<Message[]>('messages/last3').then(response => {
      setMessages(response.data)
    })
  }, [])

  return (
    <div className={styles.messageListWrapper}>
      <img src={logoImage} alt="DoWhile 2021" />

      <ul className={styles.messageList}>

        {
          messages.map(message => {
            return (
              <li key={message.id} className={styles.message}>
                <p className={styles.messageContent}>{message.text}</p>
                <div className={styles.messageUser}>
                  <div className={styles.userImage}>
                    <img src={message.user.avatar_url} alt={message.user.name} />
                  </div>
                  <span>{message.user.name}</span>
                </div>
              </li>
            );
          })
        }

        <li className={styles.message}>
          <p className={styles.messageContent}>No veo la hora de comenzar ese evento, on seguridad va a ser el mejor de todos.</p>
          <div className={styles.messageUser}>
            <div className={styles.userImage}>
              <img src="https://github.com/selles21.png" alt="Andrés Sellés" />
            </div>
            <span>Andrés Sellés</span>
          </div>
        </li>
      </ul>
    </div>
  )
}