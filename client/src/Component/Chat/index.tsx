import { v4 as uuidv4 } from 'uuid';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { io } from 'socket.io-client';

import useLocalStorage from '../../hook/useLocalStorage';
import requestAPI from '../../util/request';

interface Item {
  _id?: string;
  nickname: string;
  content: string;
}

const Message: React.FC<Item> = ({ nickname, content }) => {
  return (
    <div className='message-container'>
      <div className='message-nickname'>{nickname}</div>
      <div className='message-content'>{content}</div>
    </div>
  );
};

const Chat: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [myName, setMyName] = useState<string>('');
  const [localStorageName] = useLocalStorage('nickname', '');
  const [chats, setChats] = useState<Item[]>([]);

  const socket = io('http://localhost:8080');

  useLayoutEffect(() => {
    setMyName(localStorageName);
  }, [localStorageName]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
    },
    []
  );

  const handleButtonClick = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      const newMessage = {
        _id: uuidv4(),
        nickname: myName,
        content: input,
      };
      socket.emit('send message', newMessage);
      const data = await requestAPI.post('/api/chat', newMessage);
      if (data.status === 200) {
        setChats((prev) => [...prev, newMessage]);
        setInput('');
      }
    },
    [input, myName, socket]
  );

  // const handleKeyDown = useCallback(
  //   (e: React.KeyboardEvent<HTMLInputElement>) => {
  //     if (e.keyCode === 13) {
  //       handleButtonClick();
  //     }
  //   },
  //   [handleButtonClick]
  // );

  useLayoutEffect(() => {
    const getAllChats = async () => {
      try {
        const res = await requestAPI.get('/api/chat');
        if (res.status === 200) {
          setChats(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getAllChats();
  }, []);

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setChats((prev) => [...prev, msg]);
    });
  }, [socket]);

  return (
    <main className='chat-container'>
      <div className='chat-box'>
        <h3>{myName}님 안녕하세요</h3>
        <section className='chat-contents'>
          {chats.map((item) => (
            <Message
              key={item._id}
              nickname={item.nickname}
              content={item.content}
            />
          ))}
        </section>
        <div className='chat-input'>
          <input
            // onKeyDown={handleKeyDown}
            value={input}
            onChange={handleInputChange}
          />
          <button onClick={handleButtonClick}>입력</button>
        </div>
      </div>
    </main>
  );
};

export default Chat;
