import { v4 as uuidv4 } from 'uuid';
import { useCallback, useState } from 'react';
import requestAPI from '../../util/request';
import useLocalStorage from '../../hook/useLocalStorage';
import { useNavigate } from 'react-router-dom';
import { NICKNAME } from '../../util/constant';

const Login: React.FC = () => {
  const [nickname, setNickname] = useState<string>('');
  const [, setValue] = useLocalStorage(NICKNAME, '');
  const navigate = useNavigate();

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNickname(e.target.value);
    },
    []
  );

  const handleButtonClick = useCallback(async () => {
    const data = await requestAPI.post('/api/user', {
      socketId: uuidv4(),
      nickname,
    });
    if (data.status === 200) {
      setValue(nickname);
      navigate('/chat');
    }
  }, [navigate, nickname, setValue]);

  return (
    <main className='login-container'>
      <div className='login-box'>
        <h2>Login</h2>
        <input value={nickname} onChange={handleInputChange} />
        <button onClick={handleButtonClick}>입장</button>
      </div>
    </main>
  );
};

export default Login;
