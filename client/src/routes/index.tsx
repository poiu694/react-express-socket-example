import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Chat from '../Component/Chat';
import Login from '../Component/Login';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/chat' element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
