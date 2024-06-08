import useAuthStore from "@/store/useAtuh"
import ProjectCard from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";



interface CardProps {
  title : string;
  description : String;
  status : string;
  date : string;
}




export default function Home() {
    const {isAuthenticated} = useAuthStore();
    

    const projects = [
      {
        title : "Project A",
        description : "this is a description",
        status : "Complete",
        date : "23 May 2025"
      },
      {
        title : "Project A",
        description : "this is a description",
        status : "Complete",
        date : "23 May 2025"
      },
      {
        title : "Project A",
        description : "this is a description",
        status : "Complete",
        date : "23 May 2025"
      },
      {
        title : "Project A",
        description : "this is a description",
        status : "Complete",
        date : "23 May 2025"
      },
      {
        title : "Project A",
        description : "this is a description",
        status : "Complete",
        date : "23 May 2025"
      },
      {
        title : "Project A",
        description : "this is a description",
        status : "Complete",
        date : "23 May 2025"
      },
      {
        title : "Project A",
        description : "this is a description",
        status : "Complete",
        date : "23 May 2025"
      },
      {
        title : "Project A",
        description : "this is a description",
        status : "Complete",
        date : "23 May 2025"
      },
    ]

  return (
    <div>
      {
        isAuthenticated ? (
            <div className="container mx-auto">
              <div className="lg:px-6 py-6 px-8">
                <Link to="new-project">
                <Button>
                  Create New Project
                </Button>
                </Link>
              </div>
              <div className="flex gap-2 lg:justify-start justify-center px-6 mt-2 flex-wrap">
                {
                  projects.map((props: CardProps , index) => (
                    <ProjectCard 
                    key={index}
                    title={props.title}
                    description={props.description}
                    status={props.status}
                    date={props.date}
                    />
                  ))
                }
              </div>
            </div>
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
