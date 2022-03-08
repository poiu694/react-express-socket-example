import { useEffect, useRef } from 'react';
import { CHAT_MESSAGE } from '../util/constant';
import socket from '../util/socket';
import { HandlerType } from '../util/type';

const useSocketRef = ({ handler }: { handler: HandlerType }) => {
  const ref = useRef(null);

  useEffect(() => {
    socket.onEvent(CHAT_MESSAGE, handler);

    return () => socket.offEvent(CHAT_MESSAGE, handler);
  }, [handler]);

  return ref;
};

export default useSocketRef;
