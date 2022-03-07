import { useEffect, useRef } from 'react';
import { CHAT_MESSAGE } from '../util/constant';
import socket from '../util/socket';

const useSocketRef = ({ handler }: { handler: Function }) => {
  const ref = useRef(null);

  useEffect(() => {
    socket.onEvent(CHAT_MESSAGE, handler);

    return () => socket.offEvent(CHAT_MESSAGE, handler);
  }, [handler]);

  return ref;
};

export default useSocketRef;
