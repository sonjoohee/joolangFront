import './App.css';
import MainPage from "./pages/MainPage";
import WritePage from "./pages/WritePage";
import ProductPage from "./pages/ProductPage";
import SearchPage from "./pages/SearchPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ChatPage from "./pages/ChatPage";
import { Outlet, Route, Routes } from 'react-router-dom';



const Layout =() => {
  return(
    <div>
   

      <Outlet/>
    </div>
  )
}
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element = {<MainPage />}/>
          <Route path="LoginPage" element={<LoginPage />} />
          <Route path="SignupPage" element={<SignupPage />} />
          <Route path="WritePage" element={<WritePage />} />
          <Route path="ProductPage" element={<ProductPage />} />
          <Route path="SearchPage" element={<SearchPage />} />
          <Route path="ChatPage" element={<ChatPage />} />
      </Route>
      </Routes>

      
      
    </div>
  );
}

export default App;
