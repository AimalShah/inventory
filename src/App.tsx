import { ThemeProvider } from "./components/theme-provider";
import Navbar from "./components/Navbar";
import LoginForm from "./pages/Login";
import Home from "./pages/Home";
import { BrowserRouter as Router , Routes , Route } from "react-router-dom";
import useAuthStore from "./store/useAtuh";
import { useEffect } from "react";
import NewProject from "./pages/NewProject";
import authService from "./appwrite/auth";
function App() {
 const {setAuth} =useAuthStore()

 const init = async () => {
  try {
    const res = await authService.getCurrentUser();

    if(res) {
      setAuth(true)
    }

    if(!res) {
      alert(res)
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
            <Route path="/login" element={<LoginForm />} />
            <Route path="/new-project" element={<NewProject/>} />
          </Routes>
        </Router>
    </ThemeProvider>
    </div>
  )
}

export default App
