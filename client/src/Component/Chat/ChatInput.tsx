import { useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import requestAPI from '../../util/request';
import socket from '../../util/socket';

interface ChatInputProps {
  myName: string;
}

const ChatInput: React.FC<ChatInputProps> = ({ myName }) => {
  const [input, setInput] = useState<string>('');

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
      socket.sendMessage(newMessage);
      const data = await requestAPI.post('/api/chat', newMessage);
      if (data.status === 200) {
        setInput('');
      }
    },
    [input, myName]
  );

  return (
    <div className='chat-input'>
      <input value={input} onChange={handleInputChange} />
      <button onClick={handleButtonClick}>입력</button>
    </div>
  );
};

export default ChatInput;
