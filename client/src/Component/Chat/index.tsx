import { useCallback, useLayoutEffect, useState } from 'react';

import useLocalStorage from '../../hook/useLocalStorage';
import requestAPI from '../../util/request';
import { Item } from '../../util/type';
import ChatContent from './ChatContent';
import { NICKNAME } from '../../util/constant';
import ChatInput from './ChatInput';

const Chat: React.FC = () => {
  const [myName, setMyName] = useState<string>('');
  const [localStorageName] = useLocalStorage(NICKNAME, '');
  const [chats, setChats] = useState<Item[]>([]);

  const getInitState = useCallback(async () => {
    try {
      const res = await requestAPI.get('/api/chat');
      if (res.status === 200) {
        setChats(res.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setMyName(localStorageName as string);
    }
  }, [localStorageName]);

  /**
   * 렌더링 전에, 채팅을 모두 가져오고 유저의 이름을 설정합니다.
   */
  useLayoutEffect(() => {
    getInitState();
  }, [getInitState, localStorageName]);

  return (
    <main className='chat-container'>
      <div className='chat-box'>
        <h3>{myName}님 안녕하세요</h3>
        <ChatContent chats={chats} setChats={setChats} />
        <ChatInput myName={myName} />
      </div>
    </main>
  );
};

export default Chat;
