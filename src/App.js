import './App.css';
import MainPage from "./pages/MainPage";
import WritePage from "./pages/WritePage";
import ProductPage from "./pages/ProductPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
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
      </Route>
      </Routes>

      
      
    </div>
  );
}

export default App;