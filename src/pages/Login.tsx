import authService from "@/appwrite/auth"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useAuthStore from "@/store/useAtuh"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function LoginForm() {
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

    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input 
          id="email" 
          type="email" 
          placeholder="info@example.com" 
          value={email}
          onChange={(e : React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input 
          id="password" 
          type="password" 
          value={password}
          onChange={(e : React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          required />
        </div>
      </CardContent>
      <CardFooter>
        <Button className={`w-full`} onClick={login}>
            {
                loading ? (
                    <div className="flex items-center gap-2 w-full justify-center">
                        <div className="size-8 border-t-white border-s-white rounded-full border-2 animate-spin ">
                        </div>
                        <div>
                            Signing in....
                        </div>
                    </div>
                ) : "Sign in"
            }
        </Button>
      </CardFooter>
    </Card>
</div>
  )
}
