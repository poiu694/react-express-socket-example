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
        setInput('');
      }
    },
    [input, myName, socket]
  );

  const socketHandler = useCallback((msg: Item) => {
    setChats((prev) => [...prev, msg]);
  }, []);

  /**
   * 렌더링 전에, 채팅을 모두 가져오고 유저의 이름을 설정합니다.
   */
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
    setMyName(localStorageName);
  }, [localStorageName]);

  /**
   * 소켓 이벤트를 만들고, 해제하면서 렌더링 이슈를 잡습니다.
   */
  useEffect(() => {
    socket.on('chat message', socketHandler);

    return () => {
      socket.off('chat message', socketHandler);
    };
  }, [socket, socketHandler]);

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
          <input value={input} onChange={handleInputChange} />
          <button onClick={handleButtonClick}>입력</button>
        </div>
      </div>
    </main>
  );
};

export default Chat;
