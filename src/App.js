import './App.css';
import MainPage from "./pages/MainPage";
import WritePage from "./pages/WritePage";
import ProductPage from "./pages/ProductPage";
import SearchPage from "./pages/SearchPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ChatPage from "./pages/ChatPage";
import MyPage from "./pages/MyPage";
import { Outlet, Route, Routes } from 'react-router-dom';
import FindID from './pages/LoginPage/FindID';
import FindPass from './pages/LoginPage/FindPass';
import styled from 'styled-components';
import Nav from './components/Nav';


const Layout =() => {
  return(
    <Container>
      <Nav />
      <Outlet/>
    </Container>
  )
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
          <Route path="mypage" element={<MyPage />} />
          <Route path="find-id" element={<FindID />} />
          <Route path="find-pass" element={<FindPass />} />
      </Route>
      </Routes>

      
      
    </div>
  );
}

export default App;

const Container = styled.div`
  display : flex;
  width : 100vw;
  justify-content : center;
  align-items : center;
`