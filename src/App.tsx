import { ThemeProvider } from "./components/theme-provider";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { BrowserRouter as Router , Routes , Route } from "react-router-dom";
import useAuthStore from "./store/useAuth";
import { useEffect } from "react";
import NewProject from "./pages/NewProject";
import authService from "./appwrite/auth";
import SingleProject from "./pages/SingleProject";
import LoginPage from "./pages/Login";

function App() {

 const {setAuth} =useAuthStore()

 const init = async () => {
  try {
    const res = await authService.getCurrentUser();

    if(res) {
      setAuth(true)
    }

   
  } catch (err) {
    console.log(err)
  }
 }
 
 useEffect(() => {
  init()
 }, [])
  return (
    <div className="">
    <ThemeProvider defaultTheme="dark">
       <Router>
      <Navbar/>
          <Routes>
            <Route path="/"  element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/new-project" element={<NewProject/>} />
            <Route path="/:id" element={<SingleProject/>} />
          </Routes>
        </Router>
    </ThemeProvider>
    </div>
  )
}

export default App
