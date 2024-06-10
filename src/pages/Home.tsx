import useAuthStore from "@/store/useAuth"
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import database from "@/appwrite/projectService";
import { useNavigate } from "react-router-dom";
import ProjectCard from "@/components/ProjectCard";
import fileUpload from "@/appwrite/fileUpload";


type Data = {
  total : number;
  documents : Document[];
}

type Document = {
  $id : string;
  $collectionId : string;
  $databaseId : string;
  $createdAt : string;
  $updatedAt : string;
  $permissions : string[];
  title : string;
  imageUrl : string;
  shortDescription : string;
  description : string;
  ytLink : string;
  members : string[];
  fileId : string;
}







export default function Home() {
  const { isAuthenticated } = useAuthStore();
  const [projects, setProjects] = useState<Data | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(true)
  const navigate = useNavigate();

 

  useEffect(() => {

    const fetchData = async () => {
      const res : any | undefined = await database.getData();
      setProjects(res)
      console.log(res)
      setLoading(false)
    }
    fetchData();

  }, [])

  const handleDelete = async (id : string , fileId : string) => {
    
      try{
        await database.deleteProject(id)
        await fileUpload.deleteFile(fileId)
        alert("Project Deleted")
        navigate(0)
      } catch (err) {
        console.log(err)
      }
  }
  if (loading) {
    return <div>Loading......</div>
  }

  if(projects?.total === 0){
    return <div className="space-y-4">
        <div className="italic text-center mt-20">
          It seems Like You Have No Projects

        </div>
        <div className="text-center">
        <Link to="new-project">
                <Button>
                  Create New Project
                </Button>
        </Link>
        </div>
    </div>
  }
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
            <div className="flex gap-2 flex-col mt-2">
              {
                projects?.documents.map((project : Document , index : number) => (
                 <ProjectCard
                  $id={project.$id}
                  fileId={project.fileId}
                  index={index}
                  title={project.title}
                  imageUrl={project.imageUrl}
                  handleDelete={handleDelete}
                 />
                ))
              }
            </div>
          </div>
        ) : (

          <div className="h-[80vh] p-4 flex-col flex items-center justify-center gap-4">
            <img src="https://utfs.io/f/8aeb5653-8ebb-4ae1-ace8-6ef575d4232a-usx631.svg" alt="" className="opacity-55 w-96" />
            <h1 className="text-xl font-semibold italic opacity-60 text-center">Please Login to your Account</h1>
          </div>
        )
      }
    </div>
  )
}
