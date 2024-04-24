import { account } from "@/service/appwrite";
import { Button } from "./ui/button"
import useAuthStore from "@/store/useAtuh"
import { useNavigate  , Link } from "react-router-dom";

export default function Navbar() {
  const {isAuthenticated , setAuth} = useAuthStore();
  const navigate  = useNavigate();

  const Logout = async () => {
    try{
      const res = await account.deleteSession("current")
      if(res) {
        setAuth(false)
        navigate("/")
        window.location.reload();
      }
    } catch (err) {
      console.log(err)
    }
  } 
  return (
    <div className="border-b border-border">
      <nav className="container mx-auto flex justify-between p-4">
        <div className="text-xl font-semibold">Dashboard</div>
        <div className="font-semibold">
            {
              isAuthenticated ? (
               <Button onClick={Logout}>Logout</Button>
              ) : (
                <Button>
                  <Link to={"/login"} className="w-full h-full block">
                  Login
                  </Link>
                  </Button>
              )

            }
        </div>
      </nav>
    </div>
  )
}
