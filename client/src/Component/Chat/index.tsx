import { useLayoutEffect, useState } from 'react';
import useLocalStorage from '../../hook/useLocalStorage';

const Chat: React.FC = () => {
  const [myName, setMyName] = useState<string>('');
  const [localStorageName] = useLocalStorage('nickname', '');

  useLayoutEffect(() => {
    setMyName(localStorageName);
  }, [localStorageName]);

  return (
    <main className='chat-container'>
      <h3>{myName}님 안녕하세요</h3>
      <section className='chat-box'>
        
      </section>
    </main>
  );
};

export default Chat;
