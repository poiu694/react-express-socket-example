import { Dispatch, SetStateAction, useCallback } from 'react';

import { HandlerType, Item } from '../../util/type';
import useSocketRef from '../../hook/useSocketRef';

interface ChatContentProps {
  chats: Item[];
  setChats: Dispatch<SetStateAction<Item[]>>;
}

const Message: React.FC<Item> = ({ nickname, content }) => {
  return (
    <div className='message-container'>
      <div className='message-nickname'>{nickname}</div>
      <div className='message-content'>{content}</div>
    </div>
  );
};

const ChatContent: React.FC<ChatContentProps> = ({ chats, setChats }) => {
  const socketHandler = useCallback<HandlerType>(
    (msg) => {
      setChats((prev) => [...prev, msg]);
    },
    [setChats]
  );
  const socketRef = useSocketRef({ handler: socketHandler });

  return (
    <section className='chat-contents' ref={socketRef}>
      {chats.map((item) => (
        <Message
          key={item._id}
          nickname={item.nickname}
          content={item.content}
        />
      ))}
    </section>
  );
};

export default ChatContent;
