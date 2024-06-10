import authService from "@/appwrite/auth"
import useAuthStore from "@/store/useAuth"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import LoginForm from "@/components/Login/loginForm"


export default function LoginPage() {
    const [email , setEmail] = useState<string>("")
    const [password , setPassword] = useState<string>("")
    const [loading , setLoading] = useState<boolean>(false)
    const {setAuth } = useAuthStore();
    const navigate = useNavigate();

    const login = async (e : React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setLoading(true)
        try{
            const res = await authService.login({email , password});
            if(res) {
                setAuth(true);
                navigate('/')
            }

            if(!res) {
                alert("error")
            }

            setLoading(false)
        } catch (err) {
            console.log(err)
            setLoading(false)
        }
    }

  return (
    <div className="h-[80vh] grid place-items-center p-4">
      <LoginForm 
      email={email} 
      password={password} 
      setEmail={setEmail}
      setPassword={setPassword}
      login={login}
      loading = {loading}
      />
    </div>
  )
}
