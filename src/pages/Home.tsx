import useAuthStore from "@/store/useAtuh"
import Sidenav from "@/components/Sidenav";

export default function Home() {
    const {isAuthenticated} = useAuthStore();
    console.log(isAuthenticated)
  return (
    <div>
      {
        isAuthenticated ? (
            <Sidenav />
        ) : (

            <div className="h-[80vh] p-4 flex-col flex items-center justify-center gap-4">
                 <img src="https://utfs.io/f/8aeb5653-8ebb-4ae1-ace8-6ef575d4232a-usx631.svg" alt="" className="opacity-55 w-96"/>
                 <h1 className="text-xl font-semibold italic opacity-60 text-center">Please Login to your Account</h1>
            </div>
        )
      }
    </div>
  )
}
