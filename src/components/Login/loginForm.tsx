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

type Props = {
    email: string;
    setEmail: (e: string) => void;
    password: string;
    setPassword: (e: string) => void;
    loading: boolean;
    login: (e : React.MouseEvent<HTMLButtonElement>) => void;
}

export default function LoginForm({ email, password, setEmail, setPassword, loading, login }: Props) {
    return (
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
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        required />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
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
    )
}