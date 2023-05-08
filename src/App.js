import './App.css';
import { Routes, Route } from 'react-router-dom';
import GlobalStyles from './GlobalStyles';
import Home from './components/home/Home';
import MyPage from './components/profile/MyPage';
import Chat from './components/chat/Chat';
import Test from './components/test/Test';
import Game from './components/game/Game';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HeaderForm from './containers/common/HeaderForm';

function App() {
  return (
    <>
      <GlobalStyles />
      <Routes>
        <Route element={<HeaderForm />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/mypage" element={<MyPage />}></Route>
          <Route path="/chat" element={<Chat />}></Route>
          <Route path="/test" element={<Test />}></Route>
          <Route path="/game" element={<Game />}></Route>
        </Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
