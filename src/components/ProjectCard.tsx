import { Button } from "@/components/ui/button";
import { TrashIcon} from "@radix-ui/react-icons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useNavigate } from "react-router-dom";




interface CardProps {
  $id : string;
  title : string;
  imageUrl : string;
  index : number;
  handleDelete : (e : string , fileId : string) => Promise<void>;
  fileId : string;
}

export default function ProjectCard({$id , title , index , imageUrl , handleDelete , fileId}  : CardProps ) {
  
  const navigate = useNavigate();
  
  
  return (
      <div className="border gap-2 flex items-center rounded-md justify-between px-4">
      <div className="flex gap-2 items-center">
        <div className="p-2">{index + 1}</div>
        <div className=" flex gap-4 items-center p-2">
          <img src={imageUrl}
            className="size-12"
            alt="" />
          <div>
            {
              title
            }
          </div>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <Button onClick={() => navigate(`/${$id}`)}>
          View
        </Button>
        <AlertDialog>
          <AlertDialogTrigger>
            <Button variant={"destructive"} size={"icon"}>
              <TrashIcon/>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete project
                and remove your data from the server.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleDelete($id , fileId)}>
                Ok
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
    )
}