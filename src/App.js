import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import SignUp from "./components/SignUp";
import HomePage from "./components/HomePage";
import { useContext } from "react";
import LoginContext from "./store/login-context";


function App() {
  const loginContext=useContext(LoginContext)
  return ( 
    
     <BrowserRouter>
     <Header/>
     <Routes>
     <Route  path="/" component={loginContext.isLoggedIn?<HomePage/>:<SignUp/>} />
     </Routes>
   </BrowserRouter>
   
  );
}

export default App;
