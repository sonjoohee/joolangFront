import './App.css';
import MainPage from "./pages/MainPage";
import WritePage from "./pages/WritePage";
import ProductPage from "./pages/ProductPage";
import SearchPage from "./pages/SearchPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ChatPage from "./pages/ChatPage";
import MyPage from "./pages/MyPage";
import { Outlet, Route, Routes, useLocation } from 'react-router-dom';
import FindID from './pages/LoginPage/FindID';
import FindPass from './pages/LoginPage/FindPass';
import Nav from './components/Nav';
import EmailVerify from './pages/LoginPage/EmailVerify';
import RewritePass from './pages/LoginPage/RewritePass';
import ChatArea from './pages/ChatPage/ChatArea';
import ChatList from './pages/ChatPage/ChatList';

// import styled from 'styled-components';

const Layout = () => {
  const location = useLocation();

  return (
    <div>
      {location.pathname !== '/chatpage' && <Nav />}
      <Outlet />
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element = {<MainPage />}/>
          <Route path="loginpage" element={<LoginPage />} />
          <Route path="signuppage" element={<SignupPage />} />
          <Route path="writepage" element={<WritePage />} />
          <Route path="productpage" element={<ProductPage />} />
          <Route path="searchpage" element={<SearchPage />} />
          <Route path="chatpage" element={<ChatPage />} />
          <Route path="chatlist" element={<ChatList />} />
          <Route path="chatarea" element={<ChatArea />} />
          <Route path="mypage" element={<MyPage />} />
          <Route path="find-id" element={<FindID />} />
          <Route path="find-pass" element={<FindPass />} />
          <Route path="email-verify" element={<EmailVerify />} />
          <Route path="rewrite-password" element={<RewritePass />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

// const Container = styled.section`
// // overflow:hidden;
// display:flex;
// flex-direction: column;
// text-align: center;
// width: 100vw;  
// height: 100vh;
// // padding: 0px auto;
// padding: 20px 0px;
// `;


