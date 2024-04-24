import { ThemeProvider } from "./components/theme-provider";
import Navbar from "./components/Navbar";
import LoginForm from "./pages/Login";
import Home from "./pages/Home";
import { BrowserRouter as Router , Routes , Route } from "react-router-dom";
import useAuthStore from "./store/useAtuh";
import { account } from "./service/appwrite";
import { useEffect } from "react";
function App() {
 const {setAuth} =useAuthStore()

 const init = async () => {
  try {
    const res = await account.get();

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
          </Routes>
        </Router>
    </ThemeProvider>
    </div>
  )
}

export default App
